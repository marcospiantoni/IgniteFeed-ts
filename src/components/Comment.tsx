import { ThumbsDown, ThumbsUp, Trash } from 'phosphor-react';
import { useState } from 'react';
import { Avatar } from './Avatar';
import styles from './Comment.module.css';

interface CommentProps {
    content: string;
    onDeleteComment: (comment: string) => void;
}

export function Comment({ content, onDeleteComment}:CommentProps) {
    const [likeCountUp, setLikeCountUp] = useState(0);

    function handleLikeCountUp() {
        setLikeCountUp(likeCountUp + 1);
    }

    const [likeCountDown, setLikeCountDown] = useState(0);

    function handleLikeCountDown() {
        setLikeCountDown(likeCountDown + 1);
    }
  
    function handleDeleteComment(){
        onDeleteComment(content)
    }

    return (
        <div className={styles.comment}>
          <Avatar hasBorder={false} src="https://github.com/lucasmontano.png"  alt=""/>
          <div className={styles.commentBox}>
             <div className={styles.commentContent}>
                <header>
                    <div className={styles.authorAndTime}>
                        <strong> Lucas Montano </strong>
                        <time title='29 de maio ás 10:10' dateTime="2022-05-11 10:10:30"> Publicado cerca de 1h atrás</time>
                    </div>
                    <button onClick={handleDeleteComment} title='Deletar comentário'>
                        <Trash size={24} />
                    </button>
                </header>

                <p> {content} </p>
             </div>

              <footer>
                <button onClick={handleLikeCountUp}>
                    <ThumbsUp />
                    Like <span> {likeCountUp} </span>
                </button>
                <button onClick={handleLikeCountDown}>
                    <ThumbsUp />
                    Deslike <span> {likeCountDown} </span>
                </button>
              </footer>
          </div>
        </div>
    )
}