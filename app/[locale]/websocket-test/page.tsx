// app/[locale]/websocket-test/page.tsx - WebSocket 테스트 페이지
import WebSocketStatus from '@/components/websocket/WebSocketStatus'
import NotificationSender from '@/components/websocket/NotificationSender'

export default function WebSocketTestPage() {
    return (
        <main className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-10">
            <div className="space-y-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        WebSocket 실시간 알림 테스트
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        실시간 알림 시스템을 테스트해보세요
                    </p>
                </div>
                
                {/* WebSocket 연결 상태 */}
                <div className="flex justify-center">
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <WebSocketStatus />
                    </div>
                </div>
                
                {/* 알림 전송 컴포넌트 */}
                <div className="max-w-2xl mx-auto">
                    <NotificationSender />
                </div>
                
                {/* 사용법 안내 */}
                <div className="max-w-4xl mx-auto">
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                        <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-4">
                            사용법
                        </h2>
                        <div className="space-y-3 text-blue-800 dark:text-blue-200">
                            <p>
                                <strong>1. WebSocket 서버 시작:</strong> 터미널에서 <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">npm run websocket</code> 실행
                            </p>
                            <p>
                                <strong>2. 연결 확인:</strong> 위의 상태 표시가 "실시간 연결됨"으로 표시되는지 확인
                            </p>
                            <p>
                                <strong>3. 알림 테스트:</strong> 메시지를 입력하고 전송 버튼을 클릭
                            </p>
                            <p>
                                <strong>4. 다중 탭 테스트:</strong> 여러 브라우저 탭을 열어서 실시간 동기화 확인
                            </p>
                        </div>
                    </div>
                </div>
                
                {/* 기술 정보 */}
                <div className="max-w-4xl mx-auto">
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                            기술 스택
                        </h2>
                        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
                            <div>
                                <h3 className="font-medium text-gray-900 dark:text-white mb-2">서버</h3>
                                <ul className="space-y-1">
                                    <li>• WebSocket Server (ws 라이브러리)</li>
                                    <li>• Next.js API Routes</li>
                                    <li>• TypeScript</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-900 dark:text-white mb-2">클라이언트</h3>
                                <ul className="space-y-1">
                                    <li>• React WebSocket Hook</li>
                                    <li>• Zustand 상태 관리</li>
                                    <li>• 자동 재연결 기능</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
