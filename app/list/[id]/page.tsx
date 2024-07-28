import { API_URL } from "@/app/page";

interface Book {
    title: string;
};

type BooksResponse = {
    results: {
      books: Book[];
    };
};

async function getBooks(id: string): Promise<BooksResponse> {
    const response = await fetch(`${API_URL}/list?name=${id}`);
    return response.json();
}

export default async function page ({params: {id}}: {params: {id: string}}){
    const books = await getBooks(id);
    console.log(books.results.books);

    return(
        <div>
            <h1>list detail</h1>
            {books.results.books.map((e) => 
            <div>
                <h3>{e.title}</h3>
            </div>)}
        </div>
    );
}