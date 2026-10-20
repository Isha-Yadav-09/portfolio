import PropTypes from "prop-types";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

function SectionHeading({
  title,
  description,
  actionLabel,
  actionHref,
  actionTo,
}) {
  const action = actionTo || actionHref;

  return (
    <div className="section-heading section-heading-reference">
      <div className="section-heading-title-row">
        <h2>{title}</h2>
        {actionLabel &&
          action &&
          (actionTo ? (
            <Link className="section-heading-action" to={actionTo}>
              {actionLabel}
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          ) : (
            <a
              className="section-heading-action"
              href={actionHref}
              target="_blank"
              rel="noreferrer"
            >
              {actionLabel}
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          ))}
      </div>
      {description && <p>{description}</p>}
    </div>
  );
}

SectionHeading.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  actionLabel: PropTypes.string,
  actionHref: PropTypes.string,
  actionTo: PropTypes.string,
};

export default SectionHeading;
