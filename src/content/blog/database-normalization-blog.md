---
title: 'An Introduction to Database Normalization'
description: 'This post describes the basics of database normalization, normal forms of 1NF, 2NF, 3NF, BCNF, 4NF and 5NF'
pubDate: 'Jan 25 2025'
---

### What is Database normalization?

Database normalization is the process of structuring and organizing relational databases in relational database theory.
It involves breaking down large tables into smaller and simpler tables while maintaining relationships among the smaller tables.

### Why this is useful?

Database normalization is useful for reducing anomalies in database tables. It removes data redundancy, which in turn reduces storage costs. By doing so, the database becomes more manageable, and helps to obtain results through simple and efficient queries.

If the same data is stored in multiple columns, updating the record requires changes in multiple places. Breaking down such cases by creating a single column and linking it through relationships reduces redundancy and removes anomalies during updates.

For example, if we store the same customer details, such as name and address, in every invoice record, it results in duplication. By using normalization, we can eliminate redundancy by separating the customer details into a dedicated table and linking it to the invoices table.

Database normalization enhances data integrity, making it more consistent and accurate.

Let's examine the different normal forms in database normalization with examples:

### First Normal Form (1 NF)

This normalization ensures that each column contains only atomic values, meaning each column holds indivisible values. Each column must have a unique name, and each row in the column should contain a single value. Additionally, all attributes must depend on the primary key.  

Let's look at an example books table.

**Books**

| title             | author        | publication_date | author_country | genres      |
| ----------------- | ------------- | ---------------- | -------------- | ----------- |
| Dune              | Frank Herbert | August 1, 1965   | United States  | Science Fiction, Adventure, Political Thriller |
| The Da Vinci Code | Dan Brown     | March 18, 2003   | United States  | Mystery, Thriller, Historical Fiction       |


This table violates the 1NF as the genres column contains multiple values. To normalize it to 1NF, we define the primary key in the books table and create a **Genre_Book** table to store atomic genre records.

**Books**

| book_id | title             | author        | publication_date | author_country | 
| ------- | ----------------- |---------------| ---------------- | -------------- |
| 1       | Dune              | Frank Herbert | August 1, 1965   | United States  | 
| 2       | The Da Vinci Code | Dan Brown     | March 18, 2003   | United States  |


**Genre_Book**

| genre_book_id | book_id | genre_name         | 
| ------------- | ------- | ------------------ | 
| 1             | 1       | Science Fiction    | 
| 2             | 1       | Adventure          | 
| 3             | 1       | Political Thriller | 
| 4             | 2       | Mystery            |
| 5             | 2       | Thriller           | 
| 6             | 2       | Historical Fiction |

<br>

### Second Normal Form (2 NF)

For a database to be in the second normal form (2NF), it must first be in the first normal form (1NF). Additionally, each non-primary key must depend on the primary key itself. If changing the value of a non-primary key also changes the value of another non-primary key, then it violates the second normal form.

So far, in the **Books** table, the `author_country` column depends on the `author` column. If the author value changes and the author is from a different country as defined in the row, that also needs to be changed.

**Books**

| book_id | title             | author        | publication_date | author_country | 
| ------- | ----------------- |---------------| ---------------- | -------------- |
| 1       | Dune              | Frank Herbert | August 1, 1965   | United States  | 
| 2       | The Da Vinci Code | Dan Brown     | March 18, 2003   | United States  |

To achieve 2NF, let's break the books table into two tables: `books` and `authors`.

**Books**

| book_id | title             | author_id | publication_date |
| ------- | ----------------- | --------- | ---------------- |
| 1       | Dune              | 1         | August 1, 1965   |
| 2       | The Da Vinci Code | 2         | March 18, 2003   |

**Authors**

| author_id | author        | author_country |
| --------- | ------------- | -------------- |
| 1         | Frank Herbert | United States  |
| 2         | Dan Brown     | United States  |


<br>

### Third Normal Form (3 NF)

To be in the third normal form (3NF), a database must first be in the second normal form (2NF). Additionally, it removes transitive dependencies by ensuring that each non-key attribute depends only on the primary key.

So far, we have the following tables that are in 2NF:

**Books**

| book_id | title             | author_id | publication_date |
| ------- | ----------------- | --------- | ---------------- |
| 1       | Dune              | 1         | August 1, 1965   |
| 2       | The Da Vinci Code | 2         | March 18, 2003   |

**Authors**

| author_id | author        | author_country |
| --------- | ------------- | -------------- |
| 1         | Frank Herbert | United States  |
| 2         | Dan Brown     | United States  |

**Genre_Book**

| genre_book_id | book_id | genre_name         | 
| ------------- | ------- | ------------------ |
| 1             | 1       | Science Fiction    | 
| 2             | 1       | Adventure          | 
| 3             | 1       | Political Thriller | 
| 4             | 2       | Mystery            |
| 5             | 2       | Thriller           | 
| 6             | 2       | Historical Fiction | 

Issue in 3NF:  

Let's say there is a hidden column `author_dob` in the books table, which is a non-prime attribute (not part of the key) that depends on `author_id`, another non-prime attribute. This creates a transitive dependency: `book_id` → `author_id` → `author_dob`.  

This violates 3NF because `author_dob` depends on `author_id`, not directly on the primary key (`book_id`).  

Solution:  We should remove `author_dob` from the books table and store it in the authors table, as it directly describes the author. The tables will be as follows:

**Books**

| book_id | title             | author_id | publication_date |
| ------- | ----------------- | --------- | ---------------- |
| 1       | Dune              | 1         | August 1, 1965   |
| 2       | The Da Vinci Code | 2         | March 18, 2003   |

**Authors**

| author_id | author        | author_country | author_dob      |
| --------- | ------------- | -------------- | --------------- |
| 1         | Frank Herbert | United States  | October 8, 1920 |
| 2         | Dan Brown     | United States  | June 22, 1964   |

**Genre_Book**

| genre_book_id | book_id | genre_name         | 
| ------------- | ------- | ------------------ |
| 1             | 1       | Science Fiction    | 
| 2             | 1       | Adventure          | 
| 3             | 1       | Political Thriller | 
| 4             | 2       | Mystery            | 
| 5             | 2       | Thriller           | 
| 6             | 2       | Historical Fiction | 

<br>

### Boyce-Codd Normal Form (BCNF)

This is a stricter version of 3NF that addresses additional anomalies.
At this normalization level, every determinant is a candidate key.

Let's look at the following tables:

**Books**

| book_id | title             | author_id | publication_date |
| ------- | ----------------- | --------- | ---------------- |
| 1       | Dune              | 1         | August 1, 1965   |
| 2       | The Da Vinci Code | 2         | March 18, 2003   |

**Authors**

| author_id | author        | author_country | author_dob      |
| --------- | ------------- | -------------- | --------------- |
| 1         | Frank Herbert | United States  | October 8, 1920 |
| 2         | Dan Brown     | United States  | June 22, 1964   |

**Genre_Book**

To give an example, the genre_description column is added to this table.

| genre_book_id | book_id | genre_name         | genre_description                        |
| ------------- | ------- | ------------------ | ---------------------------------------- |
| 1             | 1       | Science Fiction    | Fiction dealing with futuristic concepts |
| 2             | 1       | Adventure          | Fiction involving exciting experiences   |
| 3             | 1       | Political Thriller | Fiction with political intrigue          |
| 4             | 2       | Mystery            | Fiction involving solving a crime        |
| 5             | 2       | Thriller           | Fiction with suspense and excitement     |
| 6             | 2       | Historical Fiction | Fiction set in a historical period       |

This Genre_Book table violates BCNF for the following reasons.

The issue lies with the functional dependency:

- `genre_name` → `genre_description`
- `genre_name` is not a superkey of the table.
- This violates the BCNF rule because all determinants (left-hand side of a functional dependency) must be superkeys in BCNF.

To comply with BCNF, we can break down the **Genre_Book** table into two tables: **Genre_Book** and **Genres**.

**Books**

| book_id | title             | author_id | publication_date |
| ------- | ----------------- | --------- | ---------------- |
| 1       | Dune              | 1         | August 1, 1965   |
| 2       | The Da Vinci Code | 2         | March 18, 2003   |

**Authors**

| author_id | author        | author_country | author_dob      |
| --------- | ------------- | -------------- | --------------- |
| 1         | Frank Herbert | United States  | October 8, 1920 |
| 2         | Dan Brown     | United States  | June 22, 1964   |

**Genres**

| genre_id | genre_name         | genre_description                        |
| -------- | ------------------ | ---------------------------------------- |
| 1        | Science Fiction    | Fiction dealing with futuristic concepts |
| 2        | Adventure          | Fiction involving exciting experiences   |
| 3        | Political Thriller | Fiction with political intrigue          |
| 4        | Mystery            | Fiction involving solving a crime        |
| 5        | Thriller           | Fiction with suspense and excitement     |
| 6        | Historical Fiction | Fiction set in a historical period       |

**Genre_Book**

| genre_book_id | book_id | genre_id |
| ------------- | ------- | -------- |
| 1             | 1       | 1        |
| 2             | 1       | 2        |
| 3             | 1       | 3        |
| 4             | 2       | 4        |
| 5             | 2       | 5        |
| 6             | 2       | 6        |


In the **Genres** table:

- `genre_name` determines `genre_description`, and `genre_id` is the superkey for the table. Therefore, it satisfies BCNF.

In the **Genre_Book** table:

- The primary key (`genre_book_id`) determines all other attributes, satisfying BCNF.

<br>

### Fourth Normal Form (4NF)

This normal form removes multivalued dependencies and should be in BCNF.  For example, let's construct the following table.

**Books_Genres_Authors**

| book_id | genre_id | author_id |
| ------- | -------- | --------- |
| 1       | 1        | 1         |
| 1       | 2        | 1         |
| 1       | 3        | 1         |
| 2       | 4        | 2         |
| 2       | 5        | 2         |
| 2       | 6        | 2         |

This table stores 
- `book_id` (FK books)
- `genre_id` (FK genres)
- `author_id` (FK authors)

Why This Violates 4NF?

- `Genres` and `Authors` have independent relationships with the book.
- For a single `book_id`, the `genre_id` and `author_id` are not dependent on each other, resulting in multivalued dependencies.
- For book_id = 1, the genres (1, 2, 3) are independent of the author (1), but they are stored together unnecessarily.

To fix this, let's split the table into the following two independent tables:

**Book_Author**

| book_author_id | book_id | author_id |
| -------------- | ------- | --------- |
| 1              | 1       | 1         |
| 2              | 2       | 2         |

**Genre_Book**

| genre_book_id | book_id | genre_id |
| ------------- | ------- | -------- |
| 1             | 1       | 1        |
| 2             | 1       | 2        |
| 3             | 1       | 3        |
| 4             | 2       | 4        |
| 5             | 2       | 5        |
| 6             | 2       | 6        |

Now, there are no multivalued dependencies, and the tables are in 4NF.

<br>

### Fifth Normal Form (5NF)

This is the highest normalization level, and it reduces the join dependencies of queries.

Suppose we extend the **Genre_Book** table to include publishers for each `book-genre` combination. This could lead to a table like this:

**Genre_Book_Publishers**

| genre_book_id | book_id | genre_id | publisher_id |
| ------------- | ------- | -------- | ------------ |
| 1             | 1       | 1        | 1            |
| 2             | 1       | 2        | 1            |
| 3             | 1       | 3        | 1            |
| 4             | 2       | 4        | 2            |
| 5             | 2       | 5        | 2            |
| 6             | 2       | 6        | 2            |
| 7             | 1       | 1        | 2            |
| 8             | 1       | 2        | 2            |

Why This Violates 5NF?  

The relationships between book_id, genre_id, and publisher_id are independent:  

- A book can belong to multiple genres.
- A book can have multiple publishers.
- A publisher may publish books in multiple genres.

This results in redundancy in the Genre_Book_Publishers table. For example:  

For book_id = 1, genre_id = 1 is associated with both publisher_id = 1 and publisher_id = 2. These relationships are independent, but they are stored in a single table, creating redundancy.  

Solution: Decompose the Table  

To resolve the 5NF violation, decompose the Genre_Book_Publishers table into smaller tables that represent independent relationships:

**Book_Genre**

| book_id | genre_id |
| ------- | -------- |
| 1       | 1        |
| 1       | 2        |
| 1       | 3        |
| 2       | 4        |
| 2       | 5        |
| 2       | 6        |

**Book_Publisher**

| book_id | publisher_id |
| ------- | ------------ |
| 1       | 1            |
| 1       | 2            |
| 2       | 2            |

**Genre_Publisher**

| genre_id | publisher_id |
| -------- | ------------ |
| 1        | 1            |
| 1        | 2            |
| 2        | 1            |
| 2        | 2            |
| 3        | 1            |
| 4        | 2            |
| 5        | 2            |
| 6        | 2            |

How This Resolves the 5NF Violation

Each table now represents a single, independent relationship:

- **Book_Genre** tracks which books belong to which genres.
- **Book_Publisher** tracks which books are published by which publishers.
- **Genre_Publisher** tracks which genres are published by which publishers.

By joining these tables, you can still reconstruct the original data without redundancy.

### Conclusion

The concept of database normalization is useful for eliminating redundancy, maintaining data integrity, scalability, and enabling flexible queries. The degree of normalization in a database depends on how you design your schema and relationships.

### References

- <https://www.datacamp.com/tutorial/normalization-in-sql>
- <https://mariadb.com/kb/en/database-normalization-overview/>
