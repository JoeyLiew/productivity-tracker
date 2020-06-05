const refreshToken = async () => {
  try {
    const res = await fetch('/api/users/refresh_token', {
      credentials: 'include',
    });
    if (res.ok) {
      const { status, data } = await res.json();
      if (status === 'success') {
        localStorage.setItem('act', data.accessToken);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export default refreshToken;
