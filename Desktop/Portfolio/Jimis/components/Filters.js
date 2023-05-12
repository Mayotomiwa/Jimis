import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

const Filters = ({ onChange, selections, sections }) => {
  return (
    <View style={styles.filtersContainer}>
      {sections.map((section, index) => (
        <TouchableOpacity
          key={section}
          onPress={() => {
            onChange(index);
          }}
          style={{
            flex: 1 / sections.length,
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 16,
            backgroundColor: selections[index] ? `${Colors.green}` : `${Colors.grey}`,
            borderWidth: 1,
            borderColor: 'white',
            borderRadius: 30,
          }}>
          <View>
            <Text style={{ 
            fontWeight: 'bold',
              color: selections[index] ? `${Colors.white}` : `${Colors.green}` }}>
              {section}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  filtersContainer: {
    color: Colors.green,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 16,
  },
});

export default Filters;
