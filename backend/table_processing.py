import orjson
import pdfplumber
from langchain.chains.combine_documents.stuff import StuffDocumentsChain
from langchain.chains.llm import LLMChain
from langchain_core.prompts import PromptTemplate
from langchain_ollama import ChatOllama
from langchain_community.document_loaders import TextLoader
import os
import re
from PyPDF2 import PdfReader, PdfWriter
import tempfile
from langchain.schema import Document

#  cd backend source a-venv/bin/activate


def extract_headers_txt(pdf_path: str):
    """
    Extracts headers from tables in each page of a PDF and returns them as a string in JSON format.

    Parameters:
        pdf_path (str): Path to the input PDF file.

    Returns:
        str: A string representing the JSON-encoded column names.
    """
    # List to store unique headers
    all_column_names = []

    # Open the PDF and process tables
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:  # Remove enumerate to avoid creating tuples
            table = page.extract_table()
            
            # If a table exists, extract the first row as header
            if table and len(table) > 0:
                column_names = table[0]  # First row as column headers
                
                # Clean and check for duplicates
                cleaned_column_names = [col.strip() if isinstance(col, str) else col for col in column_names]
                if cleaned_column_names not in all_column_names:
                    all_column_names.append(cleaned_column_names)

    # Serialize the list of column names into a JSON-formatted string
    json_column_names = orjson.dumps(all_column_names, option=orjson.OPT_INDENT_2).decode("utf-8")

    print("Headers extracted")
    # Return the JSON as a string
    return json_column_names



def process_json_string_for_column_name_extractionLLM_txt(json_string: str):
    """
    Processes a JSON string to extract column names based on a specified prompt and returns the result.

    Parameters:
        json_string (str): A JSON-formatted string representing column data.

    Returns:
        str: A string summarizing the extracted column names in the specified format.
    """
    # Prompt template for column extraction
    prompt_template = """
        Carefully analyze the provided JSON data and identify entries that appear to be column names. 

        ### Key Requirements:
        1. **Descriptive Nature**: Column names must be descriptive headers that label data fields, such as "SECRETARIAT\nDEPARTMENT" or "HEADS OF ATTACHED\nDEPARTMENTS." Exclude entries that are clearly data values, numerical indices (e.g., "ID"), or repetitive patterns.
        2. **No Modifications**: Do not add annotations, comments, or explanations in the output. Simply extract and list the entries as they appear in the input JSON.
        3. **Preserve Format**: Retain the exact formatting, including line breaks (`\n`), spacing, and punctuation, without merging or modifying elements.
        4. **Avoid Errors**: Only output entries that fit the criteria of column names. Do not include rows with numerical indices or any non-descriptive values.

        ### Input JSON Data:
        "{text}"

        ### OUTPUT FORMAT:
        Extracted column names should be output as a JSON array, preserving their original format. For example:

        Input:
        [
            ["ID", "NAME", "AGE", "CITY"],
            ["1", "Alice", "25", "New York"],
            ["2", "Bob", "30", "San Francisco"],
            ["Column A", "Column B", "Column C"]
        ]

        Output:
        [
            ["ID", "NAME", "AGE", "CITY"],
            ["Column A", "Column B", "Column C"]
        ]

        ### Final Output:
        Extract and list only column name entries. Do not include any annotations or irrelevant data.
    """
    prompt = PromptTemplate.from_template(prompt_template)


    # Define the LLM
    llm = ChatOllama(
        model="llama3",
        temperature=0,
        # Add other parameters as required
    )
    llm_chain = LLMChain(llm=llm, prompt=prompt)

    # Define StuffDocumentsChain
    stuff_chain = StuffDocumentsChain(llm_chain=llm_chain, document_variable_name="text")

    # Convert JSON string into a Document object
    input_document = Document(page_content=json_string, metadata={})

    # Process the JSON string
    try:
        summary = stuff_chain.run([input_document])
        print(summary)
    except Exception as e:
        raise RuntimeError(f"Error while processing JSON string: {e}")

    return summary



def extract_column_names_from_LLMstring_json(json_string: str):
    """
    Extracts a JSON-like list of column names from a JSON string and returns it in a formatted JSON string.

    Parameters:
        json_string (str): A string containing JSON data.

    Returns:
        str: A JSON-formatted string of extracted column names.
    """
    # Sanitize the JSON string to handle invalid escape sequences
    sanitized_string = re.sub(r'\\[^\n"bfnrt]', '', json_string)  # Remove invalid escape sequences

    # Regular expression to find the JSON-like list of lists in the text
    match = re.search(r'\[\s*\[.*?\]\s*\]', sanitized_string, re.DOTALL)
    
    # If a match is found, parse it as JSON
    if match:
        column_names = orjson.loads(match.group())
    else:
        column_names = []  # If no match is found, return an empty list
    
    # Serialize the extracted column names back into a formatted JSON string
    json_column_names = orjson.dumps(column_names, option=orjson.OPT_INDENT_2).decode("utf-8")
    
    return json_column_names



def extracted_column_pages_json(pdf_path: str):
    """
    Extracts column names and page numbers from tables in a PDF, cleans them by filtering out
    empty or whitespace-only columns, and returns the result as a JSON string.

    Parameters:
        pdf_path (str): Path to the PDF file to process.

    Returns:
        str: A JSON-formatted string containing the cleaned page numbers and column names.
    """
    tables_info = []

    # Open the PDF and process tables
    with pdfplumber.open(pdf_path) as pdf:
        for page_num, page in enumerate(pdf.pages, start=1):
            tables = page.extract_tables()

            for table in tables:
                # Extract the first row as column headers if it exists
                if table:
                    column_names = table[0]

                    # Filter out columns that are empty, None, or contain only whitespace
                    filtered_columns = [col for col in column_names if col and col.strip()]

                    # Store page and column names only if filtered_columns has valid headers
                    if filtered_columns:
                        tables_info.append({
                            "page": page_num,
                            "column_names": filtered_columns
                        })

    # Serialize the cleaned data into a JSON-formatted string
    json_string = orjson.dumps(tables_info, option=orjson.OPT_INDENT_2 | orjson.OPT_NON_STR_KEYS).decode("utf-8")

    return json_string


def load_json_file(file_path: str):
    with open(file_path, 'rb') as file:
        return orjson.loads(file.read())


def normalize_text(text):
    """
    Normalizes text by removing non-alphanumeric characters and converting to lowercase.
    """
    return re.sub(r'[^a-zA-Z0-9]', '', text).lower()


def is_partial_match(pattern, columns, threshold=0.5):
    """
    Checks for a partial match between a pattern and columns based on a threshold.
    """
    normalized_pattern = {normalize_text(col) for col in pattern if col}
    normalized_columns = {normalize_text(col) for col in columns if col}
    common_elements = normalized_pattern.intersection(normalized_columns)
    match_ratio = len(common_elements) / len(normalized_pattern)
    return match_ratio >= threshold


def find_sequential_page_matches(column_patterns, cleaned_columns):
    """
    Finds the first page that matches each pattern in sequence from column_patterns.
    """
    page_matches = []
    pattern_index = 0

    for page in cleaned_columns:
        if pattern_index >= len(column_patterns):
            break

        pattern = column_patterns[pattern_index]
        if is_partial_match(pattern, page['column_names']):
            found_page = page['page']
            page_matches.append(found_page)
            print(f"Pattern {pattern_index + 1} matched on page {found_page}")
            pattern_index += 1

    print("\nMatched pages:", page_matches)
    return page_matches


def create_page_ranges(page_matches, total_pages):
    """
    Generates page ranges from matched pages to be used for PDF splitting.
    """
    if len(page_matches) < 2:
        return [(page_matches[0], total_pages)] if page_matches else []

    page_ranges = [(page_matches[i], page_matches[i + 1] - 1) for i in range(len(page_matches) - 1)]
    page_ranges.append((page_matches[-1], total_pages))
    print("\nFinal page ranges for splitting:", page_ranges)
    return page_ranges


def split_pdf_by_page_ranges(input_pdf_path, output_folder, page_ranges):
    """
    Splits the PDF based on the provided page ranges and saves them as separate files.
    """
    os.makedirs(output_folder, exist_ok=True)
    reader = PdfReader(input_pdf_path)

    for idx, (start, end) in enumerate(page_ranges):
        writer = PdfWriter()
        print(f"\nSplitting pages from {start} to {end}")
        for page_number in range(start - 1, end):
            writer.add_page(reader.pages[page_number])

        output_pdf_path = os.path.join(output_folder, f"pages_{start}_to_{end}.pdf")
        with open(output_pdf_path, "wb") as output_pdf:
            writer.write(output_pdf)
        
        print(f"Saved: {output_pdf_path}")


def split_pdf_to_tables(input_pdf_path: str, col_patterns_json: str, cleaned_columns_json: str):
    """
    Splits a PDF and stores the results as temporary files.

    Parameters:
        input_pdf_path (str): Path to the input PDF file.
        col_patterns_json (str): JSON string containing column patterns.
        cleaned_columns_json (str): JSON string containing cleaned column names.

    Returns:
        list: A list of paths to temporary PDF files.
    """
    # Parse JSON strings into Python objects
    column_patterns = orjson.loads(col_patterns_json)
    cleaned_columns = orjson.loads(cleaned_columns_json)

    # Find sequential page matches
    page_matches = find_sequential_page_matches(column_patterns, cleaned_columns)
    if not page_matches:
        print("No page matches found; cannot proceed with PDF splitting.")
        return []

    reader = PdfReader(input_pdf_path)
    total_pages = len(reader.pages)
    page_ranges = create_page_ranges(page_matches, total_pages)

    # Create a temporary directory to store split PDF files
    temp_dir = tempfile.TemporaryDirectory()
    temp_files = []

    for start, end in page_ranges:
        writer = PdfWriter()
        for page_number in range(start - 1, end):
            writer.add_page(reader.pages[page_number])

        temp_file_path = os.path.join(temp_dir.name, f"split_{start}_to_{end}.pdf")
        with open(temp_file_path, "wb") as temp_file:
            writer.write(temp_file)
        temp_files.append(temp_file_path)

    return temp_dir, temp_files


# Method to check if two tables are part of a continuous table
def is_table_continuous(table1, table2):
    headers_page1 = table1[0]
    headers_page2 = table2[0]

    # Check if headers match
    if headers_page1 != headers_page2:
        return False

    # Check if the last row of table1 and the first row of table2 share the same key (first column)
    last_row_page1 = table1[-1]
    first_row_page2 = table2[1]

    return last_row_page1[0] == first_row_page2[0]


# Method to process each PDF file in the input folder and save combined tables in JSON format
def process_pdfs_to_temp_json_files(pdf_files):
    """
    Processes PDF files, extracts combined tables, and stores them as JSON files in a temporary directory.

    Parameters:
        pdf_files (list): List of paths to PDF files.

    Returns:
        tuple: A tuple containing the path to the temporary directory and a list of JSON file paths.
    """
    # Create a temporary directory to store JSON files
    temp_dir = tempfile.TemporaryDirectory()
    json_files = []

    for pdf_path in pdf_files:
        combined_table = []

        # Process tables within the PDF
        with pdfplumber.open(pdf_path) as pdf:
            for page in pdf.pages:
                table = page.extract_table()

                if table:
                    # Check if we should combine the table with the previous pages
                    if combined_table:
                        if is_table_continuous(combined_table, table):
                            combined_table.extend(table[1:])  # Skip header row in table2
                        else:
                            combined_table.extend(table)
                    else:
                        combined_table = table  # Initialize with the first table

        # Convert combined table to JSON and save as a temporary file
        if combined_table:
            headers = combined_table[0]  # First row as headers
            json_data = [dict(zip(headers, row)) for row in combined_table[1:]]  # Skip headers in rows

            # Define temporary JSON file path
            json_file_path = os.path.join(temp_dir.name, f"{os.path.basename(pdf_path).replace('.pdf', '.json')}")

            # Save the JSON data to the temporary file
            with open(json_file_path, 'wb') as json_file:
                json_file.write(orjson.dumps(json_data, option=orjson.OPT_INDENT_2))
            
            json_files.append(json_file_path)
            print(f"Processed {pdf_path} and saved JSON to {json_file_path}")

    return temp_dir, json_files


# Fill missing values generically for any table
def fill_missing_values_generic(data):
    last_seen_values = {}

    for row in data:
        for key in row.keys():
            if row[key] is not None and row[key] != "":
                # Update the last seen non-null value for this key
                last_seen_values[key] = row[key]
            else:
                # Fill missing value with the last seen non-null value
                row[key] = last_seen_values.get(key)

    return data


# Process JSON files in the input folder and save filled data to the output folder
def processed_json_files(input_jsons):
    """
    Processes JSON files, fills missing values, and stores the results in a temporary directory.

    Parameters:
        input_jsons (list): List of paths to input JSON files.

    Returns:
        tuple: A tuple containing the path to the temporary directory and a list of paths to filled JSON files.
    """
    # Create a temporary directory for output files
    temp_output_dir = tempfile.TemporaryDirectory()
    filled_json_files = []

    for input_file in input_jsons:
        # Read JSON data
        with open(input_file, 'rb') as json_file:  # Open in binary mode
            data = orjson.loads(json_file.read())  # Read and deserialize JSON data

            # Fill missing values
            filled_data = fill_missing_values_generic(data)

            # Define temporary output filename
            output_filename = f"filled_{os.path.basename(input_file)}"
            output_filepath = os.path.join(temp_output_dir.name, output_filename)

            # Save filled JSON data
            with open(output_filepath, 'wb') as output_json:  # Open in binary mode for writing
                output_json.write(orjson.dumps(filled_data, option=orjson.OPT_INDENT_2))  # Serialize with indentation

            filled_json_files.append(output_filepath)
            print(f"Processed and saved: {output_filepath}")

    return temp_output_dir, filled_json_files


def separate_json_logical_entries(input_jsons):
    """
    Separates entries in each JSON file from the input list, groups consecutive entries
    with the same first key-value pair, and stores each group as a separate text file
    in a temporary directory.

    Parameters:
        input_jsons (list): List of paths to input JSON files.

    Returns:
        tuple: A tuple containing the path to the temporary directory and a list of group file paths.
    """
    # Create a temporary directory for storing grouped entries
    temp_output_dir = tempfile.TemporaryDirectory()
    group_files = []

    # Loop over each JSON file
    for input_file in input_jsons:
        # Read JSON data from the file
        with open(input_file, 'rb') as json_file:  # Open in binary mode for orjson
            data = orjson.loads(json_file.read())  # Read and deserialize JSON data

            # Initialize grouping variables
            current_group = []
            current_group_key = None
            group_counter = 0

            # Process each entry
            for entry in data:
                if isinstance(entry, dict):
                    # Get the first key-value pair
                    first_key, first_value = next(iter(entry.items()))
                    new_group_key = f"{first_key}={first_value}"

                    # Check if this entry starts a new group
                    if current_group_key is None:
                        current_group_key = new_group_key

                    if new_group_key != current_group_key:
                        # Save the current group to a file
                        group_filename = f"{os.path.basename(input_file).replace('.json', '')}_group_{group_counter + 1}.txt"
                        group_filepath = os.path.join(temp_output_dir.name, group_filename)
                        with open(group_filepath, 'wb') as output_file:
                            output_file.write(orjson.dumps(current_group, option=orjson.OPT_INDENT_2))
                        print(f"Created {group_filepath}")

                        # Add file to the list and reset for the next group
                        group_files.append(group_filepath)
                        current_group = []
                        current_group_key = new_group_key
                        group_counter += 1

                    # Add the entry to the current group
                    current_group.append(entry)

            # Save the last group if not empty
            if current_group:
                group_filename = f"{os.path.basename(input_file).replace('.json', '')}_group_{group_counter + 1}.txt"
                group_filepath = os.path.join(temp_output_dir.name, group_filename)
                with open(group_filepath, 'wb') as output_file:
                    output_file.write(orjson.dumps(current_group, option=orjson.OPT_INDENT_2))
                print(f"Created {group_filepath}")
                group_files.append(group_filepath)

    return temp_output_dir, group_files


def process_text_files_for_paragraphs(input_folder: tempfile.TemporaryDirectory, output_folder: str):
    """
    Processes .txt files in the input folder, summarizes them into a single coherent paragraph,
    and saves the output to the specified output folder.

    Parameters:
        input_folder (TemporaryDirectory): Path to the folder containing input text files.
        output_folder (str): Path to the folder where summarized text files will be saved.
    """
    # Define prompt template
    prompt_template = """write the following information in a single, coherent paragraph while preserving all main points and details preserving the flow. DO NOT SKIP ANY POINT EVEN IF IT'S SERIAL NUMBER. Respond with only the paragraph text itself, and do not include any additional commentary, questions, or suggestions for further assistance. If it is not possible to create a coherent paragraph, then output the data as a single, readable sentence preserving all main points and details preserving flow:

    "{text}"

    OUTPUT:"""
    prompt = PromptTemplate.from_template(prompt_template)

    # Define LLM and LLM Chain
    llm = ChatOllama(
        model="llama3",
        temperature=0,
    )
    llm_chain = LLMChain(llm=llm, prompt=prompt)

    # Define StuffDocumentsChain
    stuff_chain = StuffDocumentsChain(llm_chain=llm_chain, document_variable_name="text")

    # Ensure output folder exists
    os.makedirs(output_folder, exist_ok=True)
    
    # Track successful and failed files
    failed_files = []
    successful_files = []

    # Use `.name` to access the actual path of the TemporaryDirectory
    for filename in (f for f in os.listdir(input_folder.name) if f.endswith(".txt")):
        input_file = os.path.join(input_folder.name, filename)

        # Parse filename to extract table and entry information
        match = re.match(r".*split_(\d+)_to_(\d+)_group_(\d+)\.txt", filename)
        if match:
            table_start, table_end, entry_number = match.groups()
            custom_name = f"table_{table_start}-{table_end}_entry_{entry_number}.txt"
        else:
            custom_name = filename  # Fallback if pattern is not matched

        output_file = os.path.join(output_folder, custom_name)
        
        try:
            # Load the document
            loader = TextLoader(input_file)
            docs = loader.load()

            # Check if the file content is valid
            if not docs or not docs[0].page_content.strip():
                raise ValueError(f"File {filename} is empty or has invalid content.")

            # Run the stuff_chain on the loaded document
            summary = stuff_chain.run(docs)

            # Save the summary to the output file
            with open(output_file, 'w', encoding='utf-8') as f:
                f.write(summary)
            
            print(f"Summary saved to '{output_file}'")
            successful_files.append(output_file)

        except Exception as e:
            print(f"Error processing file '{filename}': {e}")
            failed_files.append(filename)

    # Log failed files
    if failed_files:
        print(f"\nFailed to process the following files: {failed_files}")

    return len(failed_files) == 0  # Return success status


def process_pdf_to_summary(pdf_path):
    try:
        # Step 1: Extract column names from the PDF
        headers = extract_headers_txt(pdf_path)
        if not headers:
            raise ValueError("Failed to extract headers from the PDF.")

        # Step 2: Process extracted column names to obtain LLM summaries
        llm_column_names = process_json_string_for_column_name_extractionLLM_txt(headers)
        if not llm_column_names:
            raise ValueError("Failed to process column names for LLM extraction.")

        # Step 3: Convert LLM summaries to JSON format
        formatted_json = extract_column_names_from_LLMstring_json(llm_column_names)
        if not formatted_json:
            raise ValueError("Failed to format column names into JSON.")

        # Step 4: Extract page numbers and clean column data
        column_pages = extracted_column_pages_json(pdf_path)
        if not column_pages:
            raise ValueError("Failed to extract and clean column pages from the PDF.")

        # Step 5: Split PDF into smaller PDFs based on column patterns
        temp_pdf_dir, temp_pdfs = split_pdf_to_tables(pdf_path, formatted_json, column_pages)
        if not temp_pdfs:
            raise ValueError("Failed to split PDF into table-specific PDFs.")

        # Step 6: Process the smaller PDFs into temporary JSON files
        temp_json_dir, temp_jsons = process_pdfs_to_temp_json_files(temp_pdfs)
        if not temp_jsons:
            raise ValueError("Failed to process PDFs into JSON files.")

        # Clean up temporary PDF directory after processing
        temp_pdf_dir.cleanup()

        # Step 7: Fill missing values in JSON files
        filled_temp_dir, filled_jsons = processed_json_files(temp_jsons)
        if not filled_jsons:
            raise ValueError("Failed to fill missing values in JSON files.")

        # Clean up temporary JSON directory after filling missing values
        temp_json_dir.cleanup()

        # Step 8: Separate JSON entries into individual text files
        entries_temp_dir, entry_files = separate_json_logical_entries(filled_jsons)
        if not entry_files:
            raise ValueError("Failed to separate JSON entries into individual files.")

        # Clean up temporary filled JSON directory
        filled_temp_dir.cleanup()

        # Step 9: Ensure the "SUMMARIES" folder exists
        summaries_folder = "Tables"
        os.makedirs(summaries_folder, exist_ok=True)

        # Generate summaries from separated entries
        success = process_text_files_for_paragraphs(entries_temp_dir, summaries_folder)
        if not success:
            raise ValueError("Failed to generate summaries from text files.")

        # Clean up temporary entries directory
        entries_temp_dir.cleanup()

    except Exception as e:
        print(f"Error encountered: {e}")
        raise


# Call the function
process_pdf_to_summary("documents/1.pdf")
