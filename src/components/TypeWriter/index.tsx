import React from "react";
import TypeWriterEffect from "typewriter-effect";

interface PropsType {
  content: string;
}
const TypeWriter: React.FC<PropsType> = (props: any) => {
  const { content } = props;
  const options: any = {
    strings: content,
    pauseFor: 100,
    autoStart: true,
  };
  return <TypeWriterEffect options={options} />;
};

export default TypeWriter;
