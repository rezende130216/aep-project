import Title from "../../components/Title";
import Header from "../../components/Header";
import { FiSettings, FiUpload } from "react-icons/fi";
import Avatar from "../../assets/unicesumar.png";
import { AuthContext } from "../../contexts/auth";
import { useContext, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../services/Banco/firebaseConnection";
import { toast } from "react-toastify";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "./profile.css";

export default function Profile() {
  const { user, storageUser, setUser, logout } = useContext(AuthContext);
  const [avatarUrl, setAvatar] = useState(user && user.avatarUrl);
  const [imageAvatar, setImageAvatar] = useState(null);
  const [name, setName] = useState(user && user.name);
  const [email] = useState(user && user.email);

  function handleFile(e) {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      if (image.type === "image/jpeg" || image.type === "image/png") {
        setImageAvatar(image);
        setAvatar(URL.createObjectURL(image));
      } else {
        toast.error("Upload a PNG or JPEG image");
        setImageAvatar(null);
        return null;
      }
    }
  }
  async function handleUpload() {
    const currentUid = user.uid;
    const uploadRef = ref(storage, `images/${currentUid}/${imageAvatar.name}`);
    const uploadTask = uploadBytes(uploadRef, imageAvatar);
    uploadTask.then((snapshot) => {
      getDownloadURL(snapshot.ref).then(async (downloadURL) => {
        let url = downloadURL;
        const docRef = doc(db, "users", user.uid);
        await updateDoc(docRef, {
          avatarUrl: url,
          name: name,
        }).then(() => {
          let data = {
            ...user,
            avatarUrl: url,
            name: name,
          };
          setUser(data);
          storageUser(data);
          toast.success("Successfully updated");
        });
      });
    });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (imageAvatar === null && name !== "") {
      const docRef = doc(db, "users", user.uid);
      await updateDoc(docRef, {
        name: name,
      }).then(() => {
        let data = {
          ...user,
          name: name,
        };
        setUser(data);
        storageUser(data);
        toast.success("Successfully updated");
      });
    } else if (name !== "" && imageAvatar !== null) {
      handleUpload();
    }
  }

  return (
    <div>
      <Header />
      <div className="content">
        <Title name="My Profile">
          <FiSettings size={25} />
        </Title>

        <div className="container">
          <form className="form-profile" onSubmit={handleSubmit}>
            <label className="label-avatar">
              <span>
                <FiUpload size={25} color="#FFF" />
              </span>
              <input type="file" accept="image/*" onChange={handleFile} />
              <br />
              
            </label>
            <label>Nome:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label>Email:</label>
            <input type="text" value={email} disabled={true} />
            <button type="submit">Save</button>
          </form>
        </div>
        <div className="container">
          <button className="btn-logout" onClick={() => logout()}>
            Exit
          </button>
        </div>
      </div>
    </div>
  );
}
