import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  Image,
  SafeAreaView,
  Modal,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { styles } from "../styles/styles";
import { Ionicons } from "@expo/vector-icons";
import { Camera, CameraView, CameraType, FlashMode } from "expo-camera";
import { getThisIP, ip } from "../helpers/helpers";
// import { ip } from "../helpers/helpers";
// import { GestureHandlerRootView } from "react-native-gesture-handler";

type UserDrawing = {
  id: string;
  name: string;
  photo: string;
  date: string;
  notes: string;
};
type AnalysisModalProps = {
  state: boolean;
  item: UserDrawing | undefined;
};

type CameraModalProps = {
  state: boolean;
  item: any | undefined; //!!!
};

function AnalysisScreen() {
  const [viewAnalysis, setViewAnalysis] = useState({ state: false, id: "" });
  const [viewCamera, setViewCamera] = useState({ state: false, id: "" });
  // const [ip, setIp] = useState();

  // useEffect(() => {
  //   const fetchIp = async () => {
  //     try {
  //       const ip = await getThisIP();
  //       setIp(ip);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   fetchIp();
  // }, []);

  const [data, setData] = useState<UserDrawing[]>([]);

  const openAnalysis = (id: string) => {
    setViewAnalysis({ state: true, id: id });
  };

  const closeAnalysis = () => {
    setViewAnalysis({ state: false, id: "" });
  };

  const openCamera = () => {
    setViewCamera({ state: true, id: "" });
  };

  const closeCamera = () => {
    setViewCamera({ state: false, id: "" });
  };

  useEffect(() => {
    fetch(`http://${ip}:5000/load-images`)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }, [viewCamera, viewAnalysis]);

  return (
    <SafeAreaView style={styles.app}>
      <OpenAnalysis
        open={viewAnalysis.state}
        dismiss={closeAnalysis}
        id={viewAnalysis.id}
      />
      <OpenCamera
        open={viewCamera.state}
        dismiss={closeCamera}
        id={viewCamera.id}
      />
      <View
        style={{
          marginLeft: 30,
          marginRight: 30,
          marginBottom: 30,
          height: 200,
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "row",
          borderWidth: 1,
          gap: 6,
        }}
      >
        <TouchableOpacity onPress={openCamera}>
          <Ionicons name="camera" size={120} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container}>
        {data.map((item) => (
          <View
            key={item.id}
            style={{
              marginBottom: 40,
              marginLeft: 30,
              marginRight: 30,
              borderBottomWidth: 0.5,
              borderColor: "gray" /*backgroundColor: "blue"*/,
            }}
          >
            <View
              style={{
                // backgroundColor: "green",
                width: 345,
                alignItems: "center",
                paddingBottom: 10,
                paddingTop: 10,
              }}
            >
              <TouchableOpacity onPress={() => openAnalysis(item.id)}>
                <Image
                  style={{
                    width: 320,
                    height: 180,
                    resizeMode: "contain",
                    borderColor: "black",
                    backgroundColor: "white",
                    borderWidth: 0.2,
                    borderRadius: 10,
                  }}
                  source={{
                    uri: `data:image/jpg;base64,${item.photo}`,
                  }}
                />
              </TouchableOpacity>
            </View>
            <Text>{"date: " + item.date}</Text>
            <Text>{"name: " + item.name}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

function OpenAnalysis({
  open,
  id,
  dismiss,
}: {
  open: boolean;
  id: string;
  dismiss: () => void;
}) {
  const [res, setRes] = useState<string>();
  const [item, setItem] = useState<UserDrawing>({
    id: id,
    date: "",
    name: "",
    notes: "",
    photo: "",
  });
  // const [ip, setIp] = useState();

  // useEffect(() => {
  //   const fetchIp = async () => {
  //     try {
  //       const ip = await getThisIP();
  //       setIp(ip);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   fetchIp();
  // }, []);
  useEffect(() => {
    fetch(`http://${ip}:5000/load-item?id=${id}`)
      .then((response) => response.json())
      .then((res) => {
        setItem(res);
        // console.log(res);
      })
      .catch((error) => console.error(error));
  }, [open]);

  const analyze = async (id: string) => {
    fetch(`http://${ip}:5000/analyze?id=${id}`)
      .then((response) => response.text())
      .then((res) => setRes(res))
      .catch((error) => console.error(error));
  };

  const delete_img = async (id: string) => {
    fetch(`http://${ip}:5000/delete?id=${id}`);
  };

  // useEffect(() => console.log("tut" + item.photo), [open]);
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={open}
      onRequestClose={() => {
        dismiss(),
          setItem({ id: "", name: "", date: "", notes: "", photo: "" }),
          setRes(undefined);
      }}
    >
      <TouchableOpacity
        onPress={() => {
          dismiss(),
            setItem({ id: "", name: "", date: "", notes: "", photo: "" }),
            setRes(undefined);
        }}
      >
        <Ionicons name="close" size={32} color="black" />
      </TouchableOpacity>
      <View
        style={{
          width: "100%",
          height: "95%",
          display: "flex",
          padding: 5,
          justifyContent: "space-between",
        }}
      >
        <View>
          <View>
            <Image
              style={{ width: "100%", height: 235, resizeMode: "contain" }}
              source={{
                uri: `data:image/jpg;base64,${item.photo}`,
              }}
            />
          </View>

          <View>
            <Text
              style={{
                fontSize: 32,
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Run Analysis
            </Text>
            {res && (
              <Image
                style={{ width: "100%", height: 235, resizeMode: "contain" }}
                source={{
                  uri: `data:image/jpeg;base64,${res}`,
                }}
              />
            )}
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            style={{
              width: 180,
              height: 40,
              backgroundColor: "red",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
            }}
            onPress={() => {
              delete_img(item.id),
                dismiss(),
                setItem({ id: "", name: "", date: "", notes: "", photo: "" }),
                setRes(undefined);
            }}
          >
            <Text style={{ color: "white", fontSize: 22, fontWeight: "bold" }}>
              Delete
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 180,
              height: 40,
              backgroundColor: "blue",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
            }}
            onPress={() => analyze(item.id)}
          >
            <Text style={{ color: "white", fontSize: 22, fontWeight: "bold" }}>
              Analyze
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

function OpenCamera({
  open,
  // id,
  dismiss,
}: {
  open: boolean;
  id: string;
  dismiss: () => void;
}) {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const camera = useRef<any>();
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  // const [ip, setIp] = useState();

  // useEffect(() => {
  //   const fetchIp = async () => {
  //     try {
  //       const ip = await getThisIP();
  //       setIp(ip);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   fetchIp();
  // }, []);
  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync(); //requestPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (camera.current) {
      const data = await camera.current.takePictureAsync({ base64: true });
      setImage(data.base64);
    }
  };
  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const savePicture = async () => {
    const data = {
      image: image,
      name: name,
    };
    try {
      fetch(`http://${ip}:5000/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then(dismiss);

      setImage(null);
      setName(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={open}
      onRequestClose={dismiss}
    >
      {image ? (
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={() => {
              setImage(null);
            }}
          >
            <Ionicons name="close" size={32} color="black" />
          </TouchableOpacity>
          <Image
            source={{ uri: `data:image/jpg;base64,${image}` }}
            style={{ width: "100%", height: 235, resizeMode: "contain" }}
          />
          <TextInput
            style={{ borderColor: "gray", borderWidth: 1 }}
            onChangeText={(value) => setName(value)}
            value={name}
          />
          <TouchableOpacity
            style={{
              width: 180,
              height: 40,
              backgroundColor: "green",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
            }}
            onPress={savePicture}
          >
            <Text style={{ color: "white", fontSize: 22, fontWeight: "bold" }}>
              Save
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <CameraView style={styles.camera} ref={camera} facing="back">
            <TouchableOpacity onPress={dismiss}>
              <Ionicons
                name="close"
                size={48}
                color="white"
                //style={{ backgroundColor: "red" }} //need to be reworked
              />
            </TouchableOpacity>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                backgroundColor: "transparent",
                margin: 32,
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignSelf: "flex-end",
                  alignItems: "center",
                }}
                onPress={takePicture}
              >
                <Ionicons name="radio-button-on" size={64} color="white" />
              </TouchableOpacity>
            </View>
          </CameraView>
        </View>
      )}
    </Modal>
  );
}
export default AnalysisScreen;
