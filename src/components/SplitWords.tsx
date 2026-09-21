import { Fragment } from "react";

/* Wraps each word in a mask so headings can reveal word by word (see
   [data-reveal="words"] in globals.css). Screen readers still read the text
   normally: the spaces between words stay real spaces. */
export default function SplitWords({ text }: { text: string }) {
  const words = text.split(" ");

  return (
    <>
      {words.map((word, i) => (
        <Fragment key={i}>
          <span className="word-mask">
            <span className="word" style={{ "--word-index": i } as React.CSSProperties}>
              {word}
            </span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </>
  );
}
