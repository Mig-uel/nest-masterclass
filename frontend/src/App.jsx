import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

export default function App() {
  const handleOnSuccess = (response) => {
    console.log(response);

    const headers = new Headers();
    headers.set('Content-Type', 'application/json');

    fetch('http://localhost:3000/auth/google-authentication', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        token: response.credential,
      }),
    })
      .then((response) => {
        console.log(response);
      })
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };

  return (
    <GoogleOAuthProvider clientId="923630497596-i6e4i7j7uab4pe5f95cs4ecirvs32mpc.apps.googleusercontent.com">
      <GoogleLogin text="Login" onSuccess={handleOnSuccess} />
    </GoogleOAuthProvider>
  );
}
