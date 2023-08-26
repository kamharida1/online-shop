import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

interface ProgressBarProps {
  progress: number; // Value between 0 and 1
  success: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, success }) => {
  const [progressPercentage, setProgressPercentage] = useState(0);

  useEffect(() => {
    // Calculate the progress percentage and update the state
    const percentage = Math.round(progress * 100);
    setProgressPercentage(percentage);
  }, [progress]);

  return (
    <View style={styles.container}>
      {success ? (
        <Text style={styles.successText}>Upload Successful!</Text>
      ) : (
        <>
          <View style={styles.progressBarContainer}>
            <View
              style={{
                ...styles.progressBar,
                width: `${progressPercentage}%`,
              }}
            />
          </View>
          <Text style={styles.progressText}>{`${progressPercentage}%`}</Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  progressBarContainer: {
    width: "100%",
    height: 20,
    backgroundColor: "#ccc",
    borderRadius: 10,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#00aaff",
  },
  progressText: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
  successText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "green",
  },
});

export default ProgressBar;
