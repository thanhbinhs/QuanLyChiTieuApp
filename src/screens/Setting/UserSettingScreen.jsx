import {
  View,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import UserInfoItem from "../../components/UserInfoItem";
import { useFetchData } from "../../hooks/useFetchData";
import { FIRESTORE_DB } from "../../components/FirebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import { useChange } from "../../context/ChangeContext";
import { COLORS } from "../../constants";
import {
  getAuth,
  updateEmail,
  updatePassword,
  sendEmailVerification,
} from "firebase/auth";

export default function UserSettingScreen() {
  const { change, setChange } = useChange();
  const { userData, noteData, accountData, loading, error } =
    useFetchData(change);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState(true);

  useEffect(() => {
    if (userData) {
      setName(userData.username);
      setEmail(userData.email);
      setPassword(userData.password);
    }
  }, [userData]);

  const handleSave = async () => {
    setIsEditing(false);
    setData(false);

    // Kiểm tra điều kiện mật khẩu
    if (!password) {
      Alert.alert("Thông báo", "Mật khẩu không được để trống.");
      setData(true);
      setPassword(userData.password)
      return;
    }
    if (password.length < 8) {
      Alert.alert("Thông báo", "Mật khẩu phải có ít nhất 8 ký tự.");
      setData(true);
      setPassword(userData.password)
      return;
    }

    if (name === userData.username && email === userData.email && password === userData.password) {
      setData(true);
      return;
    }

    try {
      // Wait for auth to be non-null
      const auth = getAuth();
      const user = await new Promise((resolve, reject) => {
        const checkAuth = () => {
          const currentUser = auth.currentUser;
          if (currentUser) {
            resolve(currentUser);
          } else {
            setTimeout(checkAuth, 100); // Check again after 100ms
          }
        };
        checkAuth();
      });

      // Cập nhật mật khẩu
      if (password !== userData.password) {
        await updatePassword(user, password);
      }

      // Cập nhật email
      if (email !== userData.email) {
        await updateEmail(user, email);
        await sendEmailVerification(user); // Gửi email xác minh mới
      }

      // Cập nhật Firestore
      const userDocRef = doc(FIRESTORE_DB, `users/${userData.id}`);
      await updateDoc(userDocRef, {
        username: name,
        email: email,
        password: password,
        createdAt: userData.createdAt,
        total: userData.total,
        id: userData.id,
      });
      setData(true);
      Alert.alert("Sửa Thông tin thành công");
      setChange(!change);
    } catch (error) {
      Alert.alert("Đã có lỗi xảy ra", error.message);
    }
  };

  return (
    <>
      {data ? (
        <>
          {userData ? (
            <View style={styles.container}>
              <UserInfoItem
                label="Email"
                value={email}
                onChange={setEmail}
                isEditing={isEditing}
              />
              <UserInfoItem
                label="Tên người dùng"
                value={name}
                onChange={setName}
                isEditing={isEditing}
              />
              <UserInfoItem
                label="Mật khẩu"
                value={password}
                onChange={setPassword}
                isEditing={isEditing}
                secureTextEntry={true}
              />
              {isEditing ? (
                <Button title="Lưu lại" onPress={handleSave} />
              ) : (
                <Button title="Sửa" onPress={() => setIsEditing(true)} />
              )}
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
          )}
        </>
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f2f2f2",
  },
});
