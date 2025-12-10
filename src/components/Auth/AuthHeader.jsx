import PropTypes from "prop-types";

AuthHeader.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

export default function AuthHeader({ title, subtitle }) {
  return (
    <>
      <h2 className="text-2xl font-bold text-gray-800 text-center py-8 mt-2">
        {title}
      </h2>
      {subtitle && (
        <p className="text-center text-sm text-gray-500 mb-4">{subtitle}</p>
      )}
    </>
  );
}
