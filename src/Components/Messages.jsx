import Icon from "./Icon.jsx"

function Messages(){
    return(
        <div className="msg-page">
            <div className="msg-title">
                <h1>Messages</h1>
            </div>

            <div className="msg-layout">
                <div className="msg-list">
                    <div className="msg-list-item active">
                        <div className="msg-avatar">RV</div>
                        <div className="msg-item-info">
                            <span className="msg-item-name">Rahul Verma</span>
                            <span className="msg-item-preview">The truck will arrive by 6 PM.</span>
                            <span className="msg-item-time">2 min ago</span>
                        </div>
                        <span className="msg-unread">2</span>
                    </div>
                    <div className="msg-list-item">
                        <div className="msg-avatar">PS</div>
                        <div className="msg-item-info">
                            <span className="msg-item-name">Priya Sharma</span>
                            <span className="msg-item-preview">Can you confirm the warehouse area?</span>
                            <span className="msg-item-time">18 min ago</span>
                        </div>
                        <span className="msg-unread">1</span>
                    </div>
                    <div className="msg-list-item">
                        <div className="msg-avatar">AM</div>
                        <div className="msg-item-info">
                            <span className="msg-item-name">Amit Malhotra</span>
                            <span className="msg-item-preview">Payment received. Thanks!</span>
                            <span className="msg-item-time">1 hr ago</span>
                        </div>
                    </div>
                    <div className="msg-list-item">
                        <div className="msg-avatar">SK</div>
                        <div className="msg-item-info">
                            <span className="msg-item-name">SecureSpace Ltd</span>
                            <span className="msg-item-preview">We've reserved the unit for you.</span>
                            <span className="msg-item-time">3 hrs ago</span>
                        </div>
                    </div>
                </div>

                <div className="msg-thread">
                    <div className="msg-thread-head">
                        <div className="msg-avatar">RV</div>
                        <div className="msg-thread-user">
                            <strong>Rahul Verma</strong>
                            <span className="msg-online">Online</span>
                        </div>
                    </div>

                    <div className="msg-bubbles">
                        <div className="msg-bubble received">
                            Hi Arham, just confirming the Tata 407 for tomorrow.
                        </div>
                        <div className="msg-bubble sent">
                            Sure Rahul, it's all set. 6 PM departure from Okhla.
                        </div>
                        <div className="msg-bubble received">
                            Great. The pickup location is Dwarka Sector 12.
                        </div>
                        <div className="msg-bubble sent">
                            Perfect, noted. I'll share live tracking once it moves.
                        </div>
                        <div className="msg-bubble received">
                            The truck will arrive by 6 PM.
                        </div>
                    </div>

                    <div className="msg-input">
                        <input placeholder="Type a message..."></input>
                        <button>
                            <Icon name="send"/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Messages