import { API_URL } from "@/app/page";
import Link from "next/link";

interface Book {
    title: string;
    book_image: string;
    author: string;
    amazon_product_url: string;
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
            <div style={{display:"flex"}}>
                <div style={{paddingTop:10, paddingRight:30, paddingLeft:30, paddingBottom:30, backgroundColor: "gray", width:"auto", maxWidth:"400px", marginBottom:30}}>
                    <h3>Title : {e.title}</h3>
                    <p>Author : {e.author}</p>
                    <img key={e.title} style={{width:300}} src={e.book_image}/>
                    <br></br>
                    <Link href={e.amazon_product_url}>Buy now link</Link>
                </div>
            </div>)}
        </div>
    );
}