import { motion } from "framer-motion";
import PropTypes from "prop-types";

export default function FeaturesGrid({ features = [] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
    >
      {features.map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ y: -10, transition: { duration: 0.2 } }}
          className="bg-secondary-lighter/20 backdrop-blur-md rounded-2xl p-6 border transition-all duration-300"
        >
          <div className="flex items-center justify-start mb-4 gap-4">
            {feature.icon}
            <h3 className="text-xl font-bold">{feature.title}</h3>
          </div>
          <p className="text-sm text-text-primary/80">{feature.description}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}

FeaturesGrid.propTypes = {
  features: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.node,
      description: PropTypes.node,
      icon: PropTypes.node,
    })
  ),
};
