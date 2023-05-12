import AsyncStorage from '@react-native-async-storage/async-storage';

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Alert, SafeAreaView, Image, StyleSheet, Text, View, TouchableOpacity, SectionList, FlatList } from 'react-native';
import { Searchbar } from 'react-native-paper';
import debounce from 'lodash.debounce';

import { createTable, getMenuList, saveMenuItems, filterByQueryAndCategories } from '../dataBase/dataBase';
import { getSectionListData, useUpdateEffect } from '../utils/utils';

import Filters from '../components/Filters';
import filter from 'lodash.filter';
import Colors from '../constants/Colors';





const API_URL = 'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json';
const sections = ['Starters', 'Main', 'Deserts'];

const image_url = (imageFileName) => {

    return { uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${imageFileName}?raw=true` }

}


const Home = ({ navigation }) => {

    const [userDetails, setUserDetails] = useState();
    const [data, setData] = useState([]);
    const [searchBarText, setSearchBarText] = useState("");
    const [query, setQuery] = useState("");
    const [filterSelections, setfilterSelections] = useState(
        sections.map(() => false)
    );

    const getUserData = async () => {
        try {
            const userData = await AsyncStorage.getItem('userData');
            if (userData) {
                setUserDetails(JSON.parse(userData))
            }
        } catch (e) {
            Alert.alert(`Error: The error is here 1 ${e.message}`)
        }

    }
    useEffect(() => {
        getUserData();
        (async () => {
            try {
                // 1. Create table if it does not exist
                await createTable();
                // 2. Check if data was already stored
                let menuItems = await getMenuList();

                if (!menuItems.length) {
                    // Fetching menu from URL
                    const response = await fetch(API_URL);
                    const json = await response.json();
                    menuItems = json.menu.map((item) => ({
                        ...item,
                        image: image_url(item.image),
                    }));
                    // Storing into database
                    saveMenuItems(menuItems);
                }

                const sectionListData = getSectionListData(menuItems);
                setData(sectionListData);
            } catch (e) {
                // Handle error
                Alert.alert(`is search error here? ${e.message}`);
            }
        })();
    }, []);

    useUpdateEffect(() => {
        (async () => {
            const activeCategories = sections.filter((s, i) => {
                // If all filters are deselected, all categories are active
                if (filterSelections.every((item) => item === false)) {
                    return true;
                }
                return (
                    filterSelections[i]
                    );
            });
            try {
                const menuItems = await filterByQueryAndCategories(
                    query,
                    activeCategories
                );
                const sectionListData = getSectionListData(menuItems);
                setData(sectionListData);
            } catch (e) {
                Alert.alert(`Search error here: ${e.message}`);
            }
        })();
    }, [filterSelections, query]);

    const lookup = useCallback((q) => {
        setQuery(q);
    }, []);

    const debouncedLookup = useMemo(() => debounce(lookup, 500), [lookup]);

    const handleSearchChange = (searchBarText) => {
        setSearchBarText(searchBarText);
        debouncedLookup(searchBarText);
    };
    const handleFiltersChange = async (index) => {
        const arrayCopy = [...filterSelections];
        arrayCopy[index] = !filterSelections[index];
        setfilterSelections(arrayCopy);
    };

    const Item = ({ name, description, image }) => (
        <View style={menuStyles.innerContainer}>
            <View style={menuStyles.imageContainer}>
                <Image style={menuStyles.image} source={image} />
            </View>
            <Text style={menuStyles.nameText}>{name}</Text>
            <Text style={menuStyles.descriptionText}>{description}</Text>

        </View>
    );
    const renderItem = ({ item }) => (
        <Item name={item.name} description={item.description} image={item.image} />
    );
    return (
        <SafeAreaView style={menuStyles.container}>
            <View style={menuStyles.title}>
                <Text>
                    <Text style={menuStyles.titleHead}>Little Lemon {"\n"}</Text>
                    <Text style={menuStyles.titleColor}>Lagos {"\n"}</Text>
                </Text>
                <Text style={menuStyles.titleText}>We are a family owned Nigerian restaurant,
                    focused on traditional recipes served with a modern twist.</Text>
                <Image style={menuStyles.titleImage} source={require('../assets/images/Home.jpg')} resizeMode='cover' />
                <TouchableOpacity style={menuStyles.button}>
                    <Text style={menuStyles.titleButton}>Reserve A Table</Text>
                </TouchableOpacity>
                <Searchbar
                    placeholder="Search"
                    placeholderTextColor={Colors.green}
                    onChangeText={handleSearchChange}
                    value={searchBarText}
                    style={menuStyles.searchBar}
                    iconColor={Colors.green}
                    inputStyle={{ color: Colors.green }}
                    elevation={0}
                />
            </View>
            <Filters
                selections={filterSelections}
                onChange={handleFiltersChange}
                sections={sections}
            />
            <SectionList
                sections={data}
                key={(item) => item.id}
                renderItem={renderItem}
            />
        </SafeAreaView>
    )
}

const menuStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        backgroundColor: Colors.green,
        height: 460,
        paddingHorizontal: 10,
    },
    titleHead: {
        color: Colors.white,
        fontSize: 42,
        fontWeight: 'bold',
        fontStyle: 'italic',
        textAlign: 'left',
        marginBottom: 10,
        marginTop: 10,
    },
    titleColor: {
        color: Colors.yellow,
        fontSize: 36,
        fontWeight: 'bold',
        textAlign: 'left',
        fontStyle: 'italic',
        marginBottom: 10,
        marginTop: 10,
    },
    titleText: {
        color: Colors.white,
        fontSize: 22,
        fontWeight: 400,
        width: 220,
        height: 250,
        textAlign: 'left',
        lineHeight: 36,
        bottom: 12,
        marginBottom: 10,
    },
    titleImage: {
        position: 'absolute',
        width: 185,
        height: 270,
        borderRadius: 10,
        left: 225,
        top: 100,
    },
    innerContainer: {
        paddingHorizontal: 30,
        paddingVertical: 70,
        backgroundColor: Colors.white,
        justifyContent: 'space-between',
        flexDirection: 'column',
    },
    header: {
        fontSize: 24,
        paddingVertical: 8,
        color: Colors.green,
    },
    nameText: {
        color: Colors.green,
        fontSize: 32,
        fontWeight: 'bold',
    },
    descriptionText: {
        color: Colors.black,
        fontSize: 18,
        fontWeight: '400',
        width: 200,
    },
    itemText: {
        position: 'absolute',
        color: '#F4CE14',
        fontSize: 22,
        left: 350,
        top: 50,
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 20,

    },
    imageContainer: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        left: 230,
        top: 60,
        marginHorizontal: 10,

    },
    button: {
        borderRadius: 50,
        backgroundColor: Colors.yellow,
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 12,
        marginBottom: '5%',
        bottom: 80,
        width: 200,
    },
    titleButton: {
        color: Colors.black,
        fontWeight: 400,
        textAlign: 'center',
    },
    searchBar: {
        backgroundColor: Colors.white,
        color: Colors.green,
        bottom: 70,
    },
});

export default Home;

