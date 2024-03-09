import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import React from 'react';
import { Formik } from 'formik';

export default function Form({ addNewsFromModal, editNewsFromModal, isEditModal, isItem }) {
    return (
        <View>
            <Formik
                initialValues={{
                    name: isEditModal ? isItem.name : '',
                    anons: isEditModal ? isItem.anons : '',
                    full: isEditModal ? isItem.full : '',
                    img: isEditModal ? isItem.img : '',
                    ...(isEditModal && { key: isItem.key })
                }}
                onSubmit={(values, reset) => {
                    { isEditModal ? editNewsFromModal(values) : addNewsFromModal(values) }
                    reset.resetForm();
                }}>
                {(props) => (
                    <View style={styles.wrap}>
                        <TextInput
                            style={styles.input}
                            value={props.values.name}
                            placeholder='Write name'
                            onChangeText={(text) => props.setFieldValue('name', text)}
                        />
                        <TextInput
                            style={styles.input}
                            value={props.values.anons}
                            multiline
                            placeholder='Write anons'
                            onChangeText={(text) => props.setFieldValue('anons', text)}
                        />
                        <TextInput
                            style={styles.input}
                            value={props.values.full}
                            multiline
                            placeholder='Write full news'
                            onChangeText={(text) => props.setFieldValue('full', text)}
                        />
                        <TextInput
                            style={styles.input}
                            value={props.values.img}
                            placeholder='Add photo'
                            onChangeText={(text) => props.setFieldValue('img', text)}
                        />
                        <Pressable style={styles.btn} onPress={props.handleSubmit}>
                            <Text style={styles.text}>{isEditModal ? "Edit news" : "Add news"}</Text>
                        </Pressable>
                    </View>
                )}
            </Formik>
        </View >
    );
}

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    input: {
        width: '70%',
        padding: 5,
        fontFamily: 'mont-bolt',
        fontSize: 16,
        borderColor: 'black',
        borderWidth: 1,
        placeholderTextColor: 'gray',
        marginBottom: 15,
    },
    btn: {
        width: 'max-content',
        backgroundColor: '#0999',
        borderRadius: 10,
    },
    text: {
        fontFamily: 'mont-bolt',
        fontSize: 16,
        marginHorizontal: 20,
        marginVertical: 10,
    }
})
