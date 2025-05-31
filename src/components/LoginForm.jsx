import { motion } from "framer-motion";

// eslint-disable-next-line react/prop-types
export default function LoginForm({ formData, handleChange }) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {Object.entries(formData).map(([key, value]) => (
        <motion.div
          key={key}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: key === "email" ? 0.3 : 0.4 }}
        >
          <label
            htmlFor={key}
            className="text-text-secondary block mb-2 text-lg"
          >
            {key === "email" ? "البريد الإلكتروني" : "كلمة المرور"}
          </label>
          <input
            type={key === "password" ? "password" : "text"}
            name={key}
            id={key}
            value={value}
            onChange={handleChange}
            className="w-full p-3 bg-primary-darker text-text-primary rounded-md outline-none transition-all duration-300 focus:bg-secondary-lighter/25 focus:ring-2 focus:ring-secondary-lighter"
            required
          />
        </motion.div>
      ))}
    </div>
  );
}
