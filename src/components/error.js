export default (props) => {
	return (
		<div className={props.domClass}>
			<p>{props.error !== '' ? <i className="fa fa-times"></i> : null} {props.error}</p>
		</div>
	);
}