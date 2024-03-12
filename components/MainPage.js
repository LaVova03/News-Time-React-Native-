import axios from 'axios';
import { View, Text, Pressable, FlatList, Image, StyleSheet, Modal } from 'react-native';
import React, { useState, useEffect } from 'react';
import { gStyle } from '../styles/style';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Form from './Form';

export default function MainPage({ navigation }) {

    const [news, setNews] = useState([]);

    const [isModal, setModal] = useState(false);
    const [isEditModal, setEditModal] = useState(false);
    const [isItem, setItem] = useState(null);

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/news');
            setNews(response.data);
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    };

    const addNewsFromModal = async (article) => {
        try {
            const response = await axios.post('http://localhost:5000/api/news', article);
            console.log(response.data)
        } catch (error) {
            console.error('Error adding news:', error.message);
        } finally {
            fetchNews();
        }
        setModal(false);
        setItem(null);
    }

    const editNewsFromModal = async (article) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/news/${isItem._id}`, article);
            console.log(response.data)
        } catch (error) {
            console.error('Error adding news:', error.message);
        } finally {
            fetchNews();
        }
        setEditModal(false);
    };

    const deleteNews = async (item) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/news/${item._id}`);
            console.log(response.data)
        } catch (error) {
            console.error('Error adding news:', error.message);
        } finally {
            fetchNews();
        }
    };

    return (
        <View style={[gStyle.main, styles.scrollView]}>
            <Modal visible={isModal || isEditModal}  >
                <Pressable onPress={() => isModal ? setModal(false) : setEditModal(false)}>
                    <MaterialCommunityIcons style={styles.btn} name="close-circle-outline" size={34} color="green" />
                </Pressable>
                <Text style={styles.title}>{isModal ? "Add news" : "Edit Modal"}</Text>
                <Form
                    addNewsFromModal={addNewsFromModal}
                    editNewsFromModal={editNewsFromModal}
                    isEditModal={isEditModal}
                    isItem={isItem}
                />
            </Modal>
            <Pressable onPress={() => setModal(true)}>
                <Ionicons name="add-circle-outline" size={34} color="green" />
            </Pressable>
            <Text style={[gStyle.title, styles.header]}>Main Page</Text>
            <FlatList data={news} renderItem={({ item }) => (
                <>
                    <Pressable style={styles.item} onPress={() => navigation.navigate('FullInfo', item)}>
                        <Text style={styles.title}>{item.name} {item.anons}</Text>
                        <Image
                            source={{
                                width: '100%',
                                height: 200,
                                uri: item.img
                            }}
                        />
                    </Pressable>
                    <View style={styles.wrapBtn}>
                        <Pressable style={styles.edit} onPress={() => { setEditModal(true); setItem(item) }}>
                            <Text style={styles.text}>Edit</Text>
                        </Pressable>
                        <Pressable style={styles.edit} onPress={() => { deleteNews(item) }}>
                            <Text style={styles.text}>Delete</Text>
                        </Pressable>
                    </View>
                </>
            )} />
        </View >
    );
}

const styles = StyleSheet.create({
    wrapBtn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginHorizontal: 'auto',
        marginBottom: 20,
    },
    scrollView: {
        maxHeight: '90vh',
        overflowY: 'scroll',
    },
    item: {
        width: '100%',
        marginBottom: 30,
    },
    header: {
        marginBottom: 30,
    },
    title: {
        fontFamily: 'mont-bolt',
        fontSize: 22,
        textAlign: 'center',
        marginTop: 20,
        color: '#474747',
    },
    btn: {
        margin: 10,
        left: '85%'
    },
    edit: {
        width: 100,
        backgroundColor: '#0999',
        borderRadius: 10,
        justifyContent: 'center',
        textAlign: 'center'
    },
    text: {
        fontFamily: 'mont-bolt',
        fontSize: 16,
        marginHorizontal: 'auto',
        marginVertical: 10,
    }
})
