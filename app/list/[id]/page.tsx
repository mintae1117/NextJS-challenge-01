import { API_URL } from "@/app/config/api";
import Link from "next/link";


interface Book {
    title: string;
    book_image: string;
    author: string;
    amazon_product_url: string;
    primary_isbn10: string;
}

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
            <h2>{id}</h2>
            {books.results.books.map((e) => 
            <div key={e.primary_isbn10} style={{display:"flex"}}>
                <div style={{paddingTop:10, paddingRight:30, paddingLeft:30, paddingBottom:30, backgroundColor: "#d2d2d2", width:"auto", marginBottom:30}}>
                    <h3>Title : {e.title}</h3>
                    <p>Author : {e.author}</p>
                    <img
                        style={{ width: 300 }}
                        src={e.book_image}
                        alt={`Cover of ${e.title}`}
                    />
                    <br/>
                    <Link href={e.amazon_product_url}>Buy now link</Link>
                </div>
            </div>)}
        </div>
    );
}