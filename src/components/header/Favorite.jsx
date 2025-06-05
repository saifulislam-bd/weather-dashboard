import HeartImg from "../../assets/heart.svg";
export default function Favorite({ onShowModal }) {
  return (
    <div className="p-2 hover:bg-black/30 cursor-pointer flex gap-2 items-center rounded-md transition-all">
      <img src={HeartImg} alt="Favorite" />
      <span onClick={onShowModal}>Favorite Locations</span>
    </div>
  );
}
