import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, Image, TouchableOpacity, StatusBar } from "react-native";
import Logo from "../assets/images/logo.png";
import { useRouter } from "expo-router";

const Index = () => {
    const [welcomeText, setWelcomeText] = useState("");
    const [descriptionText, setDescriptionText] = useState("");
    const [welcomeIndex, setWelcomeIndex] = useState(0);
    const [descriptionIndex, setDescriptionIndex] = useState(0);
    const [typingCursor, setTypingCursor] = useState(true);
    const [isDescriptionTyping, setIsDescriptionTyping] = useState(false);
    const [isTypingFinished, setIsTypingFinished] = useState(false);

    const navigator = useRouter();

    const welcomeMessage = "Welcome to Calcy!";
    const descriptionMessage = "Your handy calculator app for quick and easy calculations!";

    useEffect(() => {
        if (welcomeIndex < welcomeMessage.length) {
            const timeout = setTimeout(() => {
                setWelcomeText((prev) => prev + welcomeMessage[welcomeIndex]);
                setWelcomeIndex((prev) => prev + 1);
            }, 50);

            return () => clearTimeout(timeout);
        }
    }, [welcomeIndex]);

    useEffect(() => {
        if (welcomeIndex >= welcomeMessage.length && descriptionIndex < descriptionMessage.length) {
            setIsDescriptionTyping(true);
            const timeout = setTimeout(() => {
                setDescriptionText((prev) => prev + descriptionMessage[descriptionIndex]);
                setDescriptionIndex((prev) => prev + 1);
            }, 50);

            return () => clearTimeout(timeout);
        } else if (descriptionIndex >= descriptionMessage.length) {
            setIsTypingFinished(true);
        }
    }, [welcomeIndex, descriptionIndex]);

    useEffect(() => {
        if (!isTypingFinished) {
            const cursorTimeout = setInterval(() => {
                setTypingCursor((prev) => !prev);
            }, 500);

            return () => clearInterval(cursorTimeout);
        } else {
            setTypingCursor(false);
        }
    }, [isTypingFinished]);

    return (
        <SafeAreaView className="flex-1 justify-center items-center bg-[#1E1E1E]">
            <StatusBar barStyle="light-content" backgroundColor="black" />
            <Image source={Logo} className="w-40 h-40 mb-6" resizeMode="contain" />
            <Text className="text-3xl font-bold text-white mb-4">
                {welcomeText}
                {welcomeIndex < welcomeMessage.length && typingCursor && "|"}
            </Text>
            <Text className="text-xl text-gray-400 text-center px-6 mb-8">
                {descriptionText}
                {isDescriptionTyping && typingCursor && "|"}
            </Text>
            <TouchableOpacity className="bg-blue-500 py-3 px-6 rounded-lg" onPress={() => {
                navigator.push("Home");
            }}>
                <Text className="text-white text-lg font-semibold">Start Calculating</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default Index;
