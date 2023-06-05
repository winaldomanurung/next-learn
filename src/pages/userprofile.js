import Image from "next/image";

function UserProfile(props) {
  return (
    <>
      <h1>{props.username}</h1>
      <img src="/images/coding.jpg" alt="" style={{ height: "100px" }} />
      <Image src="/images/coding.jpg" alt="" height={100} width={150} />
    </>
  );
}

export default UserProfile;

export async function getServerSideProps(context) {
  const { req } = context;

  console.log(req);
  return {
    props: {
      username: "Kodepatra",
    },
  };
}
