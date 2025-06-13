import { Author } from "@/modules/author/entities/author.entity";
import { BookInstance } from "@/modules/bookInstance/entities/bookInstance.enity";
import { Genre } from "@/modules/genre/entities/genre.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    title:string;

    @Column()
    summary:string;

    @Column()
    isbn:string;

    @Column()
    url:string;

    @ManyToOne(() => Author, (author) => author.books)
    author: Author

    @OneToMany(()=> BookInstance, (bookInstances)=>bookInstances.book)
    bookInstances: BookInstance[]

    @ManyToMany(() => Genre, (genre)=>genre.books)
    genres:Genre[]
}
