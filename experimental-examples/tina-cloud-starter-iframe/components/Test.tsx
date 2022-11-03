import { TinaMarkdown } from "tinacms/dist/rich-text";

export const Test: React.FC<{ leftColumn: any; rightColumn: any }> = ({
  leftColumn,
  rightColumn,
}) => {
  console.log({ leftColumn, rightColumn });
  return (
    <div className="flex flex-col md:flex-row items-center">
      <div className="flex-1">
        <TinaMarkdown content={leftColumn} />
      </div>
      <div className="flex-1">
        <TinaMarkdown
          content={rightColumn}
          components={{
            Highlight: ({ content }: any) => {
              console.log({ content });
              return (
                <div className="bg-yellow-300 text-black m-6 p-3 rounded-lg">
                  <TinaMarkdown content={content} />
                </div>
              );
            },
          }}
        />
      </div>
    </div>
  );
};
