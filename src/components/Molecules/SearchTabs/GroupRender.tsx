import { useRouter } from "next/router";
import { setSearchModal } from "@/reduxFeatures/app/appSlice";
import { useDispatch } from "@/redux/store";

import DOMPurify from "dompurify";
import truncate from "trunc-html";
import styles from "@/styles/searchTabs.module.scss";

function GroupRender({ search, index }) {
  console.log("GROUP search:", search);
  const router = useRouter();
  const dispatch = useDispatch();

  const sanitizer = DOMPurify.sanitize;
  return (
    <div
      className={`container-fluid my-2 text-dark ${styles.tabLi} ${
        index % 2 === 0 && styles.tabLiBg
      }`}
      onClick={() => {
        // router.push(`/gist/${search?._id}`);
        router.push(`/group/${search?._id}/timeline`);
        dispatch(setSearchModal(false));
      }}
    >
      <div className="row align-items-center">
        <span className="col-4 h6" style={{ borderRight: "1px solid gray" }}>
          {search?.title}{" "}
        </span>
        <small
          className="col-8 text-muted"
          dangerouslySetInnerHTML={{
            __html: sanitizer(truncate(search?.post, 50).html),
          }}
        />
      </div>
    </div>
  );
}

export default GroupRender;
