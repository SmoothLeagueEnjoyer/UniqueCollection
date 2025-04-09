import csv

def extract_first_added_to_uniques(csv_path, output_path):
    seen_items = set()
    unique_additions = []

    with open(csv_path, newline='', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        
        for row in reader:
            item = row['Item']
            if (
                row['Action'].lower() == 'added' and 
                row['Stash'].lower() == 'unique' and 
				row['League'] == 'SGF April Hardcore (PL53725)' and 
                item not in seen_items
            ):
                unique_additions.append(row)
                seen_items.add(item)

    # Write the results to a new CSV
    if unique_additions:
        with open(output_path, 'w', newline='', encoding='utf-8') as outfile:
            writer = csv.DictWriter(outfile, fieldnames=unique_additions[0].keys())
            writer.writeheader()
            writer.writerows(unique_additions)

        print(f"Extracted {len(unique_additions)} unique item additions to '{output_path}'")
    else:
        print("No matching entries found.")

# Example usage
extract_first_added_to_uniques('input.csv', 'unique_additions.csv')
