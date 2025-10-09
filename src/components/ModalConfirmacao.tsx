import { View, Text, TouchableOpacity, Modal } from 'react-native';

interface ModalConfirmacaoProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title?: string;
  message?: string;
}

export default function ModalConfirmacao({
  visible,
  onConfirm,
  onCancel,
  title = 'Deseja excluir?',
  message = 'Esta ação não poderá ser desfeita'
}: ModalConfirmacaoProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
    >
      <View className="flex-1 justify-center items-center bg-black/50 ">
        <View className="bg-white rounded-2xl p-6 w-96">
          <Text className="text-lg font-bold mb-2">
            {title}
          </Text>
          <Text className="text-gray-600 mb-6">
            {message}
          </Text>

          <View className="flex-row gap-3">
            <TouchableOpacity
              onPress={onCancel}
              className="flex-1 bg-[#92F2E8] rounded-xl p-3 shadow-black shadow-2xl"
            >
              <Text className="text-[#35A296] font-bold text-center">
                Não
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onConfirm}
              className="flex-1 bg-[#92F2E8] rounded-xl p-3"
            >
              <Text className="text-[#35A296] font-bold text-center">
                Sim
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}