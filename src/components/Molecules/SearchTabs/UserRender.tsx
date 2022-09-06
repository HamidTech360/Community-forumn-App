import Image from "next/image";
import styles from "@/styles/searchTabs.module.scss";
import { useRouter } from "next/router";
import { setSearchModal } from "@/reduxFeatures/app/appSlice";
import { useDispatch } from "@/redux/store";

function UserRender({ search, index }) {
  const router = useRouter();
  const dispatch = useDispatch();
  return (
    <div
      className={`container-fluid my-2 text-dark ${styles.tabLi} ${
        index % 2 === 0 && styles.tabLiBg
      }`}
      onClick={() => {
        router.push(`/profile/${search?._id}`);
        dispatch(setSearchModal(false));
      }}
    >
      <div className="row align-items-center">
        <Image
          src={"/images/imagePlaceholder.jpg"}
          alt="image"
          width={35}
          height={35}
          className="col-2 me-0 pe-0"
        ></Image>
        <div className="col-10 pe-0 d-inline" style={{ cursor: "pointer" }}>
          {search?.firstName} {search?.lastName}
        </div>
      </div>
    </div>
  );
}

export default UserRender;
