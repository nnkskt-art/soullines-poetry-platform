import { View, Text, StyleSheet, Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated'

export default function WelcomeScreen() {
  const router = useRouter()

  return (
    <LinearGradient
      colors={['#667eea', '#764ba2']}
      style={styles.container}
    >
      <Animated.View 
        entering={FadeIn.duration(1000)}
        style={styles.content}
      >
        <Animated.Text 
          entering={FadeInDown.delay(200).duration(800)}
          style={styles.title}
        >
          SoulLines
        </Animated.Text>
        
        <Animated.Text 
          entering={FadeInDown.delay(400).duration(800)}
          style={styles.subtitle}
        >
          Where poetry meets emotion
        </Animated.Text>

        <Animated.View 
          entering={FadeInDown.delay(600).duration(800)}
          style={styles.buttonContainer}
        >
          <Pressable
            style={styles.button}
            onPress={() => router.push('/(tabs)')}
          >
            <Text style={styles.buttonText}>Enter</Text>
          </Pressable>
        </Animated.View>
      </Animated.View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
    fontFamily: 'System',
  },
  subtitle: {
    fontSize: 20,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 48,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 32,
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 48,
    paddingVertical: 16,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
})
