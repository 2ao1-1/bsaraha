import { motion } from "framer-motion";
import PropTypes from "prop-types";

export default function HowItWorks({ steps = [] }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.8 }}
      className="mt-20 max-w-4xl mx-auto"
    >
      <h2 className="text-4xl font-bold text-text-primary text-center mb-12">
        كيف يعمل؟
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2 + index * 0.2 }}
            className="text-center bg-secondary-lighter/30 backdrop-blur-md rounded-2xl p-6"
          >
            <div className="flex items-center justify-start mb-4 text-text-primary gap-4">
              <span className="text-2xl font-bold w-10 h-10 border-2 border-primary rounded-full flex items-center justify-center">
                {item.step}
              </span>
              <h3 className="text-xl font-bold text-text-primary">
                {item.title}
              </h3>
            </div>
            <p className="text-text-primary/80">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

HowItWorks.propTypes = {
  steps: PropTypes.array,
};
