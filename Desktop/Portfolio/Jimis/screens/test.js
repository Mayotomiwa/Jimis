import AsyncStorage from '@react-native-async-storage/async-storage';

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Alert, SafeAreaView, Image, StyleSheet, Text, View, TouchableOpacity, SectionList } from 'react-native';
import { Searchbar } from 'react-native-paper';
import debounce from 'lodash.debounce';

import { createTable, getMenuList, saveMenuItems, filterList } from '../dataBase/dataBase';
import Filters from '../components/Filters';
import { getSectionList, useUpdateEffect } from '../utils/utils';
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
    const [filteredData, setFilteredData] = useState(
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
    const getMenu = async () => {
        const result = await fetch(API_URL);
        const data = await result.json();
        const menuItems = data.menu.map((item) => {
            return {
                ...item,
                image: image_url(item.image),
            };
        });
        return menuItems;
    };


    useEffect(() => {
        getUserData();
        (async () => {
            try {
                await createTable();
                let menuItems = await getMenuList();
                if (!menuItems) {
                    const menuItems = await getMenu();
                    saveMenuItems(menuItems);
                }

                const sectionList = getSectionList(menuItems);
                setData(sectionList);
            } catch (e) {
                // Handle error
                Alert.alert(e.message);
            }
        })();
    }, []);

    useUpdateEffect(() => {
        (async () => {
            const activeCategories = sections.filter((s, i) => {
                if (filteredData.every((item) => item === false)) {
                    return true;
                }
                return filteredData[i];
            });
            try {
                const menuItems = await filterList(
                    query,
                    activeCategories
                );
                const sectionList = getSectionList(menuItems);
                setData(sectionList);
            } catch (e) {
                Alert.alert(`Error: The error is here 4 ${e.message}`);
            }
        })();
    }, [filteredData, query]);


    const lookup = useCallback((q) => {
        setQuery(q);
    }, []);

    const debouncedLookup = useMemo(() => debounce(lookup, 500), [lookup]);

    const handleSearchChange = (text) => {
        setSearchBarText(text);
        debouncedLookup(text);
    };

    const handleFiltersChange = async (index) => {
        const arrayCopy = [...filteredData];
        arrayCopy[index] = !filteredData[index];
        setFilteredData(arrayCopy);
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
                    placeholderTextColor="white"
                    onChangeText={handleSearchChange}
                    value={searchBarText}
                    style={menuStyles.searchBar}
                    iconColor={Colors.green}
                    inputStyle={{ color: Colors.green }}
                    elevation={0}
                />
            </View>
            <Filters
                selections={filteredData}
                onChange={handleFiltersChange}
                sections={sections}
            />
            <SectionList
                style={menuStyles.sectionList}
                sections={data}
                keyExtractor={(item) => item.id}
                renderItem={renderItem} />
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
    nameText: {
        color: Colors.green,
        fontSize: 32,
        fontWeight: 'bold',
    },
    descriptionText: {
        color: Colors.black,
        fontSize: 15,
        fontWeight: '500',
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
    sectionList: {
        paddingHorizontal: 16,
    },
});

export default Home;

import {useRef, useEffect} from 'react';


export function getSectionListData(data) {
  const dataByCategory = data.reduce((acc, curr) => {
    const menuItem = {
      id: curr.id,
      name: curr.name,
      title: curr.title, 
      description: curr.description,
      image: curr.image,
      price: curr.price
    };
    if (!Array.isArray(acc[curr.category])) {
      acc[curr.category] = [menuItem];
    } else {
      acc[curr.category].push(menuItem);
    }
    return acc;
  }, {});
  const sectionListData = Object.entries(dataByCategory).map(([key, item]) => {
    return {
      title: key,
      data: item,
    };
  });
  return sectionListData;
}

export function useUpdateEffect(effect, dependencies = []) {
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      return effect();
    }
  }, dependencies);
}