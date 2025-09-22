import Mainpage from "@/components/main/Mainpage"
import NotificationDemoWrapper from "@/components/notification/demo/NotificationDemoWrapper"

export default function Main() {

	return (
        <div className="pt-4 sm:pt-6 space-y-6">
            {/* 알림 테스트 컴포넌트 */}
            <NotificationDemoWrapper />
            
            <Mainpage />
        </div>
    )
}