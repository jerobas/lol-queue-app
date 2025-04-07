import TeemoImage from "../../components/teemoImage";
import useSession from "../../hooks/useSession";

const Home = () => {
  const data = useSession();

  return <div className="overflow-y-auto align-middle justify-center items-center">
    <TeemoImage data={data} />
  </div>
};

export default Home;