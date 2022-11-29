import { Header } from './components/Header';
import { Post }from './components/Post';
import { Sidebar } from './components/Sidebar';
import styles from './App.module.css';

import './global.css';

const posts = [
  {
    id: 1,
    author: {
       avatarUrl: 'https://github.com/diego3g.png',
       name: 'Diego Fernandes',
       role: 'STO @ Rocketseat'
    },
    content:[
      {type: 'paragraph', content:'Fala Dev'},
      {type: 'paragraph', content:'Acabei de subir um projeto novo no GitHub. É um projeto que fiz para performance no React, link do repositório 🚀:'},,
      {type: 'link', content: 'performance-react'},
    ],
    publishedAt: new Date('2022-11-29 15:20:00'),
  },
  {
    id: 2,
    author: {
       avatarUrl: 'https://github.com/rafaballerini.png',
       name: 'Rafa Ballerini',
       role: 'CEO @ Ballerini'
    },
    content:[
      {type: 'paragraph2', content:'Fala galeraa 👋'},
      {type: 'paragraph2', content:'Acabei de soltar um video novo no YouTube(Rafaella Ballerini) sobre: 10 projetos de HTML e CSS para adicionar no seu portfólio '},,
      {type: 'link2', content: '10 ideias de projetos em HTML e CSS para adicionar no portfólio!'},
    ],
    publishedAt: new Date('2022-11-29 08:45:00')
  },
];


export function App() {
  return (
    <div>
      <Header />
    <div className= {styles.wrapper}>
      <Sidebar />
        <main>
           {posts.map(post => {
            return (
            <Post
               key={post.id}
               author=  {post.author}
               content= {post.content}
               publishedAt= {post.publishedAt}
             />
            )
           })}
        </main>
      </div>
    </div>
  )
}


