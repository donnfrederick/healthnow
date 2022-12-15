export default (props) => {
	return (
		<div className={props.dataClass}>
			<h2>{props.dataDetails.first_name} {props.dataDetails.last_name}</h2>
			<p>Address: <strong>{props.dataDetails.address}</strong></p>
			<p>Contact Number: <strong>{props.dataDetails.phone_number}</strong></p>
			<p>Email: <strong>{props.dataDetails.email}</strong></p>
		</div>
	);
}