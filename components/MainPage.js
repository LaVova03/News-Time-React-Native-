import { View, Text, Pressable, FlatList, Image, StyleSheet, Modal } from 'react-native';
import React, { useState } from 'react';
import { gStyle } from '../styles/style';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Form from './Form';

export default function MainPage({ navigation }) {

    const [news, setNews] = useState([
        { name: 'Google', anons: '22.02.2022', full: 'Create Google', key: '1', img: 'https://www.android.com/static/2016/img/gms/search.png' },
        { name: 'Facebook', anons: '22.02.2022', full: 'Create Facebook', key: '2', img: 'https://www.deskera.com/blog/content/images/2021/11/alexander-shatov-CTZhGbSxWLI-unsplash.jpg' },
        { name: 'Instagram', anons: '22.02.2022', full: 'Create Instagram', key: '3', img: 'https://www.liga.net/images/general/2022/09/09/20220909173635-1819.jpg?v=1662734195' },
    ]);

    const [isModal, setModal] = useState(false);
    const [isEditModal, setEditModal] = useState(false);
    const [isItem, setItem] = useState(null);

    const addNewsFromModal = (article) => {
        setNews((prev) => {
            article.key = Math.random().toString()
            return [
                ...prev,
                article
            ]
        })
        setModal(false);
        setItem(null);
    }

    const editNewsFromModal = (article) => {
        setNews((prevNews) => {
            return prevNews.map((el) => {
                if (el.key === article.key) {
                    return article;
                } else {
                    console.log(article.key);
                    return el;
                }
            });
        });
        setEditModal(false);
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
                        <Pressable style={styles.edit} onPress={() => {
                            setNews((prevNews) => {
                                return prevNews.filter((newsItem) => newsItem.key !== item.key);
                            });
                        }}>
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
