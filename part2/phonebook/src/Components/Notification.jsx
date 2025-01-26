export default function Notification({ notifInfo }) {
  if (!notifInfo.message) {
    return null;
  }

  const successStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginVottom: 10,
  };

  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginVottom: 10,
  };

  return <div style={notifInfo.error ? errorStyle : successStyle}>{notifInfo.message}</div>;
}
