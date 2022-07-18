import {Events} from '@/util/events';
import React, {useEffect, useState} from 'react';
import {Modal, StyleSheet, Text, View} from 'react-native';

const Toast: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  useEffect(() => {
    Events.on('toast', v => {
      setText(v);
      setModalVisible(true);
    });
  }, []);
  useEffect(() => {
    if (modalVisible) {
      setTimeout(() => {
        setModalVisible(false);
      }, 1000);
    }
  }, [modalVisible]);
  return (
    <Modal
      visible={modalVisible}
      onRequestClose={() => {}}
      transparent={true}
      animationType="fade">
      <View style={styles.modal}>
        <View style={styles.content}>
          <Text>{text}</Text>
        </View>
      </View>
    </Modal>
  );
};

export default Toast;
const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 4,
    backgroundColor: '#fff',
    fontSize: 16,
  },
});
