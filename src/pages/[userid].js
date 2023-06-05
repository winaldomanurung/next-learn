function UserId(props) {
  return <h1>Ini adalah page untuk user id: {props.id}</h1>;
}

export default UserId;

export async function getServerSideProps(context) {
  const { params } = context;

  const userId = params.userid;

  return {
    props: {
      id: userId,
    },
  };
}
