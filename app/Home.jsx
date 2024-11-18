import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { AntDesign, Entypo, Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const OperatorButton = ({ children, onPress }) => (
    <TouchableOpacity
        activeOpacity={0.5}
        onPress={onPress}
        style={{
            borderRadius: 150,
            shadowColor: '#FAFF00',
            shadowOffset: { width: 10, height: 10 },
            shadowOpacity: 1,
            shadowRadius: 10,
            elevation: 10,
        }}
    >
        <LinearGradient
            colors={['#FAFF00', '#FF00F5']}
            start={[0, -0.32]}
            end={[1.6, 1.6]}
            style={{
                width: 80,
                height: 80,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 150,
            }}
        >
            {children}
        </LinearGradient>
    </TouchableOpacity>
);

const Home = () => {
    const [expression, setExpression] = useState("");
    const [result, setResult] = useState(null);

    const handleNumberPress = (num) => {
        if (result !== null) {
            setExpression(num);
            setResult(null);
        } else {
            setExpression((prev) => prev + num);
        }
    };

    const handleOperatorPress = (op) => {
        if (result !== null) {
            setExpression(result + op);
            setResult(null);
        } else {
            setExpression((prev) => {
                if (prev && /[+\-*/%]$/.test(prev)) {
                    return prev.slice(0, -1) + op;
                }
                return prev + op;
            });
        }
    };

    const handleEquals = () => {
        try {
            const evaluated = eval(expression);
            setResult(String(evaluated));
        } catch (error) {
            setResult("Error");
        }
    };

    const handleClear = () => {
        setExpression("");
        setResult(null);
    };

    const handleBackspace = () => {
        if (result !== null) {
            setExpression("");
            setResult(null);
        } else {
            setExpression((prev) => prev.slice(0, -1));
        }
    };

    const handleDecimal = () => {
        if (result !== null) {
            setExpression("0.");
            setResult(null);
        } else if (!expression.endsWith(".")) {
            setExpression((prev) => prev + ".");
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-[#1E1E1E] p-5">
            <View className="flex-[0.6] justify-end items-end">
                <Text
                    style={{
                        fontSize: result !== null ? 40 : 60,
                        color: result !== null ? '#A0A0A0' : '#FFFFFF',
                    }}
                    selectable
                >
                    {expression || "0"}
                </Text>
                {result !== null && (
                    <Text
                        style={{
                            fontSize: 50, 
                            color: '#FFFFFF',
                            fontWeight: '500',
                        }}
                    >
                        = {result}
                    </Text>
                )}
            </View>

            <View className="flex-1 mt-5">
                <View className="flex flex-row justify-between">
                    <TouchableOpacity
                        onPress={handleClear}
                        activeOpacity={0.5}
                        className="bg-[#333333] w-[80px] h-[80px] flex justify-center items-center rounded-full"
                    >
                        <Text className="text-4xl text-white">C</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handleBackspace}
                        activeOpacity={0.5}
                        className="bg-[#333333] w-[80px] h-[80px] flex justify-center items-center rounded-full"
                    >
                        <FontAwesome5 name="backspace" size={28} color="white" />
                    </TouchableOpacity>
                    <OperatorButton onPress={() => handleOperatorPress('%')}>
                        <Text className="text-4xl text-white">%</Text>
                    </OperatorButton>
                    <OperatorButton onPress={() => handleOperatorPress('/')}>
                        <Feather name="divide" size={30} color="white" />
                    </OperatorButton>
                </View>

                {/* Second Row */}
                <View className="flex flex-row justify-between mt-5">
                    {[7, 8, 9].map((num) => (
                        <TouchableOpacity
                            key={num}
                            onPress={() => handleNumberPress(String(num))}
                            activeOpacity={0.5}
                            className="bg-[#333333] w-[80px] h-[80px] flex justify-center items-center rounded-full"
                        >
                            <Text className="text-4xl text-white">{num}</Text>
                        </TouchableOpacity>
                    ))}
                    <OperatorButton onPress={() => handleOperatorPress('*')}>
                        <Entypo name="cross" size={32} color="white" />
                    </OperatorButton>
                </View>

                {/* Third Row */}
                <View className="flex flex-row justify-between mt-5">
                    {[4, 5, 6].map((num) => (
                        <TouchableOpacity
                            key={num}
                            onPress={() => handleNumberPress(String(num))}
                            activeOpacity={0.5}
                            className="bg-[#333333] w-[80px] h-[80px] flex justify-center items-center rounded-full"
                        >
                            <Text className="text-4xl text-white">{num}</Text>
                        </TouchableOpacity>
                    ))}
                    <OperatorButton onPress={() => handleOperatorPress('-')}>
                        <AntDesign name="minus" size={30} color="white" />
                    </OperatorButton>
                </View>

                {/* Fourth Row */}
                <View className="flex flex-row justify-between mt-5">
                    {[1, 2, 3].map((num) => (
                        <TouchableOpacity
                            key={num}
                            onPress={() => handleNumberPress(String(num))}
                            activeOpacity={0.5}
                            className="bg-[#333333] w-[80px] h-[80px] flex justify-center items-center rounded-full"
                        >
                            <Text className="text-4xl text-white">{num}</Text>
                        </TouchableOpacity>
                    ))}
                    <OperatorButton onPress={() => handleOperatorPress('+')}>
                        <Text className="text-4xl text-white">+</Text>
                    </OperatorButton>
                </View>

                {/* Fifth Row */}
                <View className="flex flex-row justify-between mt-5">
                    <TouchableOpacity
                        onPress={() => handleNumberPress("0")}
                        activeOpacity={0.5}
                        className="bg-[#333333] w-[170px] h-[80px] flex justify-center items-center rounded-full"
                    >
                        <Text className="text-4xl text-white">0</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handleDecimal}
                        activeOpacity={0.5}
                        className="bg-[#333333] w-[80px] h-[80px] flex justify-center items-center rounded-full"
                    >
                        <Text className="text-4xl text-white">.</Text>
                    </TouchableOpacity>
                    <OperatorButton onPress={handleEquals}>
                        <Text className="text-4xl text-white">=</Text>
                    </OperatorButton>
                </View>
            </View>
        </SafeAreaView>
    );
};


export default Home;
