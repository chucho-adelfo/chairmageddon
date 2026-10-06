type TopPromptProps = {
  text: string;
};

export default function TopPrompt({ text }: TopPromptProps) {
  return <h1 className="top-prompt">{text}</h1>;
}
