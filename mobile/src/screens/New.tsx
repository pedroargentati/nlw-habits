import React, { useState } from "react";
import { ScrollView, View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { BackButton } from "../components/BackButton";
import { Checkbox } from "../components/Checkbox";
import { Feather } from '@expo/vector-icons';
import colors from 'tailwindcss/colors';
import { api } from "../lib/axios";

export function New() {
    const [weekDays, setWeekDays] = useState<number[]>([]);
    const [title, setTitle] = useState('');

    const availableWeekDays = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];

    function handleToggleWeekDay(weekDayIndex: number) {
        if (weekDays.includes(weekDayIndex)) {
            setWeekDays(prevState => prevState.filter(weekDay => weekDay !== weekDayIndex))
        } else {
            setWeekDays(prevState => [...prevState, weekDayIndex])
        }
    }

    async function handleCreateNewhabit() {
        try {
            if (!title.trim() || weekDays.length === 0) {
                return Alert.alert('Novo hábito', 'É necessário informar o nome do hábito e a periodicidade.')
            }

            await api.post('/habits', { title, weekDays});
            
            // resetando inputs
            setTitle('')
            setWeekDays([])

            Alert.alert('Nobo hábito', `Hábito '${title}' criado com sucesso!`)
        } catch (error) {
            console.log(error);
            Alert.alert('Ops!', 'Não foi possível criar um novo Hábito.');
        }
    }

    return (
        <View className="flex-1 bg-background px-8 pt-16">
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                <BackButton />

                <Text className="mt-6 text-white font-extrabold text-3xl">
                    Criar hábito
                </Text>

                <Text className="mt-6 text-white font-semibold text-base">
                    Qual seu comprometimento?
                </Text>

                <TextInput
                    className="h-12 pl-4 rounded-l mt-3 bg-zinc-900 text-white border-2 border-zinc-800 focus:border-green-600"
                    placeholder="Ex.: Exercícios, beber água, etc..."
                    placeholderTextColor={colors.zinc[400]}
                    onChangeText={setTitle}
                    value={title}
                />

                <Text className="font-semibold mt-4 mb-3 text-white text-base">
                    Qual a recorrência?
                </Text>
                {
                    availableWeekDays.map((weekDay, index) => (
                        <Checkbox
                            key={weekDay}
                            title={weekDay}
                            checked={weekDays.includes(index)}
                            onPress={() => handleToggleWeekDay(index)}
                        />
                    ))
                }

                <TouchableOpacity
                    className="w-full h-14 flex-row items-center justify-center bg-green-600 rounded-md mt-6"
                    activeOpacity={0.6}
                    onPress={handleCreateNewhabit}
                >
                    <Feather
                        name="check"
                        size={20}
                        color={colors.white}
                    />

                    <Text className="font-semibold text-base text-white ml-2">
                        Confirmar
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}