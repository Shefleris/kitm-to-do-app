// Not really a reactive component, defining like this for convenient reuse

const LoadingPlaceholder = (props, { children }) => {
	switch (props.formFactor) {
		case "select":
		default:
			return <div className="loading-placeholder">{children}</div>;
			break;
	}
};

export default LoadingPlaceholder;
