import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Loader2 } from "lucide-react";
import { useParams } from "react-router-dom";
import useSendMessage from "../hooks/useSendMessage";
import UserProfileCard from "../components/SendMessage/UserProfileCard";
import SendForm from "../components/SendMessage/SendForm";
import PublicMessageCard from "../components/SendMessage/PublicMessageCard";

export default function SendMessage() {
  const { username } = useParams();

  const {
    userInfo,
    loadingUser,
    message,
    setMessage,
    loading,
    status,
    handleSend,
    reloadUser,
    charCount,
    maxChars,
  } = useSendMessage();

  if (loadingUser) {
    return (
      <div className=" flex items-center justify-center p-4 inset-0 -z-10 min-h-screen w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div>
        <div className="text-center z-20">
          <Loader2 className="w-16 h-16 text-secondary-main animate-spin mx-auto mb-4" />
          <p className="text-secondary-main text-lg">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className=" flex items-center justify-center md:p-4 inset-0 -z-10 min-h-screen w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div>
      <div className="container mx-auto px-4 max-w-3xl space-y-6 z-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-2xl p-8"
        >
          <UserProfileCard
            userInfo={userInfo}
            username={username}
            reloadUser={reloadUser}
          />
          {/* <div>
            <div className="text-end pt-2 text-gray-400">
              {timeAgo(userInfo.memberSince)}
            </div>
          </div> */}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-2xl p-6"
        >
          <SendForm
            message={message}
            setMessage={setMessage}
            handleSend={handleSend}
            loading={loading}
            charCount={charCount}
            maxChars={maxChars}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className=" "
        >
          {userInfo.publicMessages === null ? (
            <div className="text-center py-12">
              <Loader2 className="w-12 h-12 text-purple-600 animate-spin mx-auto mb-3" />
              <p className="text-gray-600">جاري تحميل الرسائل...</p>
            </div>
          ) : userInfo.publicMessages.length > 0 ? (
            <div className="space-y-4">
              {userInfo.publicMessages.map((msg) => (
                <PublicMessageCard
                  profilePic={userInfo.profilePicture}
                  key={msg._id}
                  message={msg}
                  ownerName={userInfo.fullName}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle size={48} className="text-gray-400" />
              </div>
              <p className="text-gray-600">لا توجد رسائل حالياً</p>
            </div>
          )}
        </motion.div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
          <p className="font-medium mb-2">ملاحظات:</p>
          <ul className="text-xs space-y-1">
            <li>• رسالتك ستكون مجهولة تماماً</li>
            <li>• لن يعرف المستقبل من أنت</li>
            <li>• كن محترماً ولطيفاً</li>
          </ul>
        </div>

        <AnimatePresence>
          {status && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className={`fixed bottom-4 right-4 left-4 md:left-auto md:w-96 px-6 py-4 rounded-lg shadow-2xl ${
                status.type === "success" ? "bg-green-500" : "bg-red-500"
              } text-white`}
            >
              <p className="font-medium">{status.text}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
