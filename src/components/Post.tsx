import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR'

import { Comment } from './Comment';
import { Avatar } from './Avatar';

import styles from './Post.module.css';
import { FormEvent, useState, ChangeEvent, InvalidEvent } from 'react';

interface Author {
 name: string;
 role: string;
 avatarUrl: string;
}

interface Content {
  type: string;
  content: string;  
}

interface PostProps {
  author: Author;
  publishedAt: Date;
  content: Content[];  
}

export function Post({ author, publishedAt, content }: PostProps) {
  const [newCommentText,  setNewCommentText] = useState('')
  
  const [comments, setComments] = useState([
    'Post muito bacana, hein?!' 
  ]) 

  const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'ás' HH:mm'h'", {
    locale: ptBR,
  })

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true,
  })

  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault();
    
    setComments([...comments, newCommentText]);
    setNewCommentText('')
  }

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('');
    setNewCommentText(event.target.value);
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
   event.target.setCustomValidity('Esse campo é obrigatório');
  }

  function deleteComment(commentToDelete:string ) {
   const commentsWithoutDeleletedOne = comments.filter(comment => {
    return comment !== commentToDelete;
   })

    setComments(commentsWithoutDeleletedOne); 
  }
   
  const isNewCommentEmpty = newCommentText.length === 0;

  return(
    <article className={styles.post}>
      <header>
            <div className={styles.author}>
               <Avatar src={author.avatarUrl}  />
                <div className={styles.authorInfo}>
                    <strong> {author.name} </strong>
                    <span> {author.role} </span>
                </div>
            </div>

            <time title= {publishedDateFormatted} dateTime={publishedAt.toISOString()}> 
              { publishedDateRelativeToNow }
            </time>
      </header>

      <div className={styles.content}>
      {content.map(line => {
        if (line.type === 'paragraph') {
          return <p key={line.content} >{line.content}</p>
        }
        else if (line.type === 'link') {
          return <p key={line.content} ><a href="https://github.com/diego3g/performance-react"> {line.content} </a></p>;
       }
      })}
      </div>

      <div className={styles.content}>
      {content.map(line => {
        if (line.type === 'paragraph2') {
          return <p key={line.content} >{line.content}</p>
        }
        else if (line.type === 'link2') {
          return <p key={line.content} ><a href="https://www.youtube.com/watch?v=y4ltLH9iK8E&ab_channel=RafaellaBallerini"> {line.content} </a></p>;
       }
      })}
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong> Deixe seu feedback </strong>

        <textarea 
         name='comment'
         placeholder='Deixe um comentário'
         value={newCommentText}
         onChange={handleNewCommentChange}
         onInvalid={handleNewCommentInvalid}
         required
        />

       <footer>
          <button type="submit" disabled={isNewCommentEmpty}>
             Publicar 
          </button>
       </footer>
      </form>

      <div className={styles.commentList}>
       {comments.map(comment => {
        return (<Comment 
            key={comment} 
            content={comment} 
            onDeleteComment={deleteComment}
            />
            )})}
      </div>
    </article>
  )
}