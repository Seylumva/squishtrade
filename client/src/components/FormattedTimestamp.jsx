import formatDistanceToNow from "date-fns/formatDistanceToNow";

const FormattedTimestamp = ({ timestamp, prepend }) => {
  return (
    <p className="text-gray-400 font-semibold">
      {prepend && `${prepend} `}
      {formatDistanceToNow(new Date(timestamp), {
        addSuffix: true,
      })}
    </p>
  );
};

export default FormattedTimestamp;
