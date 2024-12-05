import { useParams } from "next/navigation";
import React, { useEffect, useRef } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

export const RoomPage = () => {
  const { boardId } = useParams();
  const roomID = boardId?.toString();
  const containerRef = useRef<HTMLDivElement>(null);
  const zcInstance = useRef<any>(null);

  useEffect(() => {
    const initializeMeeting = async () => {
      if (!roomID || zcInstance.current) return; // Prevent duplicate initializations

      const appID = Number(process.env.NEXT_PUBLIC_APP_ID);
      const serverSecret = process.env.NEXT_PUBLIC_SERVER_SECRET!;
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomID,
        Date.now().toString(),
        "Satyam"
      );

      zcInstance.current = ZegoUIKitPrebuilt.create(kitToken);

      zcInstance.current.joinRoom({
        container: containerRef.current,
        scenario: {
          mode: ZegoUIKitPrebuilt.GroupCall,
        },
      });

      // Optional: Enable auto-leave when only one user remains
      //   zcInstance.current.autoLeaveRoomWhenOnlySelfInRoom = true;
    };

    initializeMeeting();

    // Cleanup on component unmount
    return () => {
      if (zcInstance.current) {
        zcInstance.current.destroy(); // Correct cleanup method
        zcInstance.current = null;
      }
    };
  }, [roomID]);

  return <div ref={containerRef} />;
};
